import { TAuthUser } from "../../types/auth";
import { Global, GlobalEvent } from "../../utils/global";
import { WHTTP } from "../../utils/http";
import UToken from "../../utils/token";

export default class AuthService
{
    public static async login(email: string, password: string): Promise<string>
    {
        const data = await WHTTP.post(`/users/auth-with-password`, {
            identity: email,
            password: password
        }) as TAuthUser;

        if (!data.token) return "";

        UToken.saveToken(data.token);
        Global.dispatchEvent(GlobalEvent.OnLoggedIn);

        return data.token;
    }

    public static logout(): void
    {
        UToken.deleteToken();
        Global.dispatchEvent(GlobalEvent.OnLoggedOut);
    }
}
