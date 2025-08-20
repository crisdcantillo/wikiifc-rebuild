import WLogin from "./login";
import AuthService from "./services";

export default class AuthModule
{
    private center: HTMLElement;
    private right: HTMLElement;

    private login: WLogin;

    constructor(center: HTMLElement, right: HTMLElement)
    {
        this.center = center;
        this.right = right;
        this.login = new WLogin();

        this.center.appendChild(this.login.html)
        this.right.appendChild(document.createElement("div"));

        this.login.onSubmit = async (data) => AuthService.login(data.email, data.password);
    }
}
