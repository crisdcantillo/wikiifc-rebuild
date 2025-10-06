export type FilesState =
    | { status: "NotOpened" }
    | { status: "Opened"; fileId: string };

type Listener = (state: FilesState) => void;

export class FilesStorage
{
    private static _instance: FilesStorage;
    private _state: FilesState = { status: "NotOpened" };
    private listeners: Listener[] = [];

    private constructor() {}

    public static get instance(): FilesStorage
    {
        if (!this._instance) this._instance = new FilesStorage();
        return this._instance;
    }

    public get state(): FilesState
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

    private setState(state: FilesState): void
    {
        this._state = state;
        this.listeners.forEach(l => l(this._state));
    }

    // Actions
    openFile(fileId: string): void
    {
        this.setState({ status: "Opened", fileId: fileId });
    }

    closeFile(): void
    {
        this.setState({ status: "NotOpened" });
    }
}
