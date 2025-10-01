import WElement from "../../core/element";

export default class WLogin extends WElement
{
    private email: HTMLInputElement;
    private password: HTMLInputElement;

    public onSubmit: ((data: { email: string, password: string }) => void) | null = null;

    constructor()
    {
        super(html, css);
        this.email = this.html.querySelector("[name='email']") as HTMLInputElement;
        this.password = this.html.querySelector("[name='password']") as HTMLInputElement;

        this.html.addEventListener("submit", (e) => this.onEventSubmit(e));
    }

    private onEventSubmit(e: SubmitEvent): void
    {
        if (!this.onSubmit) return;
        e.preventDefault();

        this.onSubmit
        ({
            email: this.email.value,
            password: this.password.value
        });
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-login-container">
        <form class="w-login">
            <h2 class="w-login__title">Login</h2>
            <div class="w-login__fields">
                <input class="w-input" type="email" placeholder="Email" name="email" required/>
                <input class="w-input" type="password" placeholder="Password" name="password" required/>
            </div>
            <button class="w-btn--primary" type="submit">Login</button>
            <p class="w-login__link">Don't have an account? <a>Register</a></p>
        </form>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-login-container
    {
        width: 100%;
        height: 100%;
        background-color: rgba(var(--color-black), 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .w-login
    {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 32px;
        background-color: rgba(var(--color-darkgrey), 1);
        border-radius: 6px;
    }

    .w-login__title
    {
        text-align: center;
        margin-bottom: 24px;
        color: rgba(var(--color-white), 1);
        font-size: 20px;
    }

    .w-login__fields
    {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .w-login__link
    {
        width: 100%;
        color: rgba(var(--color-white), 1);
        font-size: 14px;
        text-align: center;
        margin-top: 16px;
    }

    .w-login__link a
    {
        text-decoration: underline;
        font-weight: bold;
    }
    `
}
