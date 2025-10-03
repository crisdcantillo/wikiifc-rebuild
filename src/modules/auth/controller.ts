import WModule from "../../core/module";
import PersistentStorage from "../../core/storage";
import AuthService from "../../services/auth";
import WSpinner from "../../shared/spinner";
import { AuthStorage } from "../../storages/auth-storage";
import WLogin from "./login";

export default class AuthModule extends WModule
{
    private login: WLogin;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.tryAutoLogin();

        this.login = new WLogin();
        this.login.onSubmit = async (data) =>
        {
            const spinner = new WSpinner();
            this.login.html.appendChild(spinner.html);

            const res = await AuthService.login(data.email, data.password);
            spinner.destroy();

            const sessionId = res.data?.sessionId;
            if (sessionId) AuthStorage.instance.signIn(sessionId);
            else AuthStorage.instance.signOut();

        }

        AuthStorage.instance.subscribe((state) =>
        {
            switch (state.status) {
                case "SignIn":
                    this.showAuth(false);
                    break;
                case "SignOut":
                    this.showAuth(true);
                    break;
            }
        });
    }

    public async tryAutoLogin(): Promise<void>
    {

        const sessionId = PersistentStorage.getSessionId();
        if (!sessionId) return AuthStorage.instance.signOut()

        // show spinner in the whole page
        const body = document.querySelector("body");
        const spinner = new WSpinner();
        body?.appendChild(spinner.html);

        const res = await AuthService.session(sessionId);
        setTimeout(() => spinner.destroy(), 300); // delay destroy to avoid blinks on page

        const isLoggedIn = res.success;
        if (!isLoggedIn) AuthStorage.instance.signOut();
        else AuthStorage.instance.signIn(sessionId);
    }

    private showAuth(shouldShow: boolean): void
    {
        if (shouldShow)
        {
            // the auth ui is always visible in the middle panel if the user is logged out
            // we force that behavior setting styles as the ones below
            this.center.appendChild(this.login.html)
            this.center.style.display = "flex";
            this.center.style.position = "absolute";
            this.center.style.inset = "0";
            this.center.style.zIndex = "99";
        }
        else
        {
            this.login.html.remove();
            this.center.style.removeProperty("display");
            this.center.style.removeProperty("position");
            this.center.style.removeProperty("inset");
            this.center.style.removeProperty("z-index");
        }
    }
}
