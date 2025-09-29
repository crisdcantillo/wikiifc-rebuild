import { WHTTP } from "../utils/http";

export default class AuthService
{
    public static async login(email: string, password: string): Promise<string>
    {
        const res = await WHTTP.post(`/login`, {
            identity: email,
            password: password
        });

        if (!res.success) return "";
        return res.data;
    }

    public static async logout(): Promise<void>
    {
        const res = await WHTTP.post(`/logout`, {});

        if (!res.success) return;
        return res.data;
    }
}
