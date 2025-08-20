export default class UToken
{
    public static get token(): string
    {
        const token = localStorage.getItem("token") ?? "";
        return token;
    }

    public static saveToken(token: string): void
    {
        localStorage.setItem("token", token);
    }

    public static deleteToken(): void
    {
        localStorage.removeItem("token");
    }
}
