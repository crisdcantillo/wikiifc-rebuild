import { TUser } from "../types/user"
import { WRes, WHTTP } from "../utils/http"

type TFile =
{
    id: string,
    name: string,
    created: string,
    owner: TUser,
    createdBy: TUser,
    updated: string | null
    sharedWith: TSharedWith[]
}

type TSharedWith =
{
    id: string,
    file: TFile,
    user: TUser,
    created: string,
    updated: string | null
}

export default class FilesService
{
    public static async getFiles(): Promise<WRes<TFile[]>>
    {
        const res = await WHTTP.request<TFile[]>
        ({
            method: "GET",
            endpoint: `/files/records?expand=owner,createdBy,sharedWith`
        });

        return res;
    }

    public static async getFile(id: string): Promise<WRes<TFile>>
    {
        const res = await WHTTP.request<TFile>
        ({
            method: "GET",
            endpoint: `/files/records/${id}?expand=owner,createdBy,sharedWith`
        });

        return res;
    }

    public static async getSharedList(fileId: string): Promise<WRes<TUser[]>>
    {
        const res = await WHTTP.request<TUser[]>
        ({
            method: "GET",
            endpoint: `/shared_with/records?filter=(file="${fileId}")&expand=user`
        });

        return res;
    }
}
