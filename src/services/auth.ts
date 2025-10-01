import { WRes, WHTTP } from "../utils/http";

type TSession = string

type TLogin =
{
    email: string,
    password: string,
    sessionId: string
}

export default class AuthService
{
    public static async session(sessionId: string): Promise<WRes<TSession>>
    {
        const res = await WHTTP.request<TSession>
        ({
            method: "GET",
            endpoint: "/session",
            headers: { "sessionid": sessionId }
        });

        return res;
    }

    public static async login(email: string, password: string): Promise<WRes<TLogin>>
    {
        const res = await WHTTP.request<TLogin>
        ({
            method: "POST",
            endpoint: "/login",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return res;
    }

    public static async logout(): Promise<WRes<void>>
    {
        const res = await WHTTP.request<void>
        ({
            method: "POST",
            endpoint: "/logout"
        })

        return res;
    }
}
