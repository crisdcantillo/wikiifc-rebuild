import PersistentStorage from "../core/storage";
import { WRes, WHTTP } from "../utils/http"

type TFile =
{
    id: string,
    name: string,
    timestamp: number,
    users: TSharedWith[] | null,
}

type TSharedWith =
{
    email: string,
    name: string
}

export default class FilesService
{
    public static async getFiles(): Promise<WRes<TFile[]>>
    {
        const res = await WHTTP.request<TFile[]>
        ({
            method: "GET",
            endpoint: `/files`,
            headers: { "sessionid": PersistentStorage.getSessionId() ?? "" }
        });

        return res;
    }

    public static async getFile(id: string): Promise<WRes<TFile>>
    {
        const res = await WHTTP.request<TFile>
        ({
            method: "GET",
            endpoint: `/getfileinfo/${id}`,
            headers: { "sessionid": PersistentStorage.getSessionId() ?? "" }
        });

        return res;
    }
}
