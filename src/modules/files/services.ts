import { TPaginatedResponse } from "../../types/response";
import { TUser } from "../../types/user";
import { WHTTP } from "../../utils/http"

type TFile =
{
    id: string,
    name: string,
    created: string,
    owner: string,
    createdBy: string,
    updated: string
    sharedWith: string[]
    expand?: {
        sharedWith: TSharedWith
    }
}

type TSharedWith =
{
    id: string,
    file: string[],
    user: string[],
    created: string,
    updated: string
    expand?: {
        file: TFile,
        user: TUser
    }
}

export default class FilesService
{
    public static async getFiles(): Promise<TPaginatedResponse<TFile>>
    {
        const data = await WHTTP.get(`/files/records`) as TPaginatedResponse<TFile>;
        return data;
    }

    public static async getFile(id: string): Promise<TFile>
    {
        const data = await WHTTP.get(`/files/records/${id}`) as TFile;
        return data;
    }

    public static async getSharedList(fileId: string): Promise<TPaginatedResponse<TUser>>
    {
        const data = await WHTTP.get(`/shared_with/records?filter=(file="${fileId}")&expand=user`) as TPaginatedResponse<TSharedWith>
        return {
            page: data.page,
            perPage: data.perPage,
            totalPages: data.totalPages,
            totalItems: data.totalItems,
            items: data.items.map(i => i.expand!.user)
        };
    }
}
