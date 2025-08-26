import { TAuthUser } from "../../types/auth";
import { Global, GlobalEvent } from "../../utils/global";
import { WHTTP } from "../../utils/http";
import UToken from "../../utils/token";

export default class AuthService
{
    public static async login(email: string, password: string): Promise<string>
    {
        const res = await WHTTP.post(`/users/auth-with-password`, {
            identity: email,
            password: password
        });

        if (!res.success) return "";
        const data = res.data as TAuthUser;

        UToken.saveToken(data.token);
        Global.dispatchEvent(GlobalEvent.OnLoggedIn);

        return res.data.token;
    }

    public static logout(): void
    {
        UToken.deleteToken();
        Global.dispatchEvent(GlobalEvent.OnLoggedOut);
    }
}
