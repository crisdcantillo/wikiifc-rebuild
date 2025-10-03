import WStorage from "../core/storage";

export type AuthState =
    | { status: "SignOut" }
    | { status: "SignIn"; sessionId: string };

type Listener = (state: AuthState) => void;

export class AuthStorage
{
    private static _instance: AuthStorage;
    private _state: AuthState = { status: "SignOut" };
    private listeners: Listener[] = [];

    private constructor() {}

    public static get instance(): AuthStorage
    {
        if (!this._instance) this._instance = new AuthStorage();
        return this._instance;
    }

    public get state(): AuthState
    {
        return this._state;
    }

    public subscribe(listener: Listener): void
    {
        this.listeners.push(listener);
        listener(this._state);
    }

    public unsubscribe(listener: Listener): void
    {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private setState(state: AuthState): void
    {
        this._state = state;
        this.listeners.forEach(l => l(this._state));
    }

    // Actions
    signIn(sessionId: string): void
    {
        WStorage.saveSessionId(sessionId);
        this.setState({ status: "SignIn", sessionId: sessionId });
    }

    signOut(): void
    {
        WStorage.deleteSessionId();
        this.setState({ status: "SignOut" });
    }
}
