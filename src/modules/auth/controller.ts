import WModule from "../../core/module";
import PersistentStorage from "../../core/storage";
import AuthService from "../../services/auth";
import { AuthStorage } from "../../storages/auth-storage";
import WLogin from "./login";

export default class AuthModule extends WModule
{
    private login: WLogin;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.login = new WLogin();

        this.tryAutoLogin();

        this.center.appendChild(this.login.html)
        this.right.appendChild(document.createElement("div"));

        AuthStorage.instance.subscribe((state) =>
        {
            switch (state.status) {
                case "SignIn":
                    this.lockUserOnAuthScreen(false);
                    break;
                case "SignOut":
                    this.lockUserOnAuthScreen(true);
                    break;
            }
        });
    }

    public async tryAutoLogin(): Promise<void>
    {
        const sessionId = PersistentStorage.getSessionId();
        if (!sessionId) return this.userNotAuthorized();

        const res = await AuthService.session(sessionId);
        const isLoggedIn = res.success;

        if (!isLoggedIn) this.userNotAuthorized();
        else this.userAuthorized(sessionId);
    }

    private userNotAuthorized(): void
    {
        AuthStorage.instance.signOut();
        this.lockUserOnAuthScreen(true);

        this.login.onSubmit = async (data) =>
        {
            const res = await AuthService.login(data.email, data.password);
            const sessionId = res.data?.sessionId;

            if (sessionId) AuthStorage.instance.signIn(sessionId);
            else AuthStorage.instance.signOut();

        }
    }

    private userAuthorized(sessionId: string): void
    {
        AuthStorage.instance.signIn(sessionId);
        this.lockUserOnAuthScreen(false);
        this.login.onSubmit = null;
    }

    private lockUserOnAuthScreen(shouldShow: boolean): void
    {
        if (shouldShow)
        {
            this.center.style.display = "flex";
            this.center.style.position = "absolute";
            this.center.style.inset = "0";
            this.center.style.zIndex = "99";
        }
        else
        {
            this.center.style.removeProperty("display");
            this.center.style.removeProperty("position");
            this.center.style.removeProperty("inset");
            this.center.style.removeProperty("z-index");
        }
    }
}
