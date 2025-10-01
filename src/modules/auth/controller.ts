import WModule from "../../core/module";
import AuthService from "../../services/auth";
import WLogin from "./login";

export default class AuthModule extends WModule
{
    private login: WLogin;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.login = new WLogin();

        this.center.appendChild(this.login.html)
        this.right.appendChild(document.createElement("div"));

        this.login.onSubmit = async (data) => AuthService.login(data.email, data.password);
    }
}
