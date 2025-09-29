import { TPaginatedResponse, TResponse } from "../types/response"
import { TUser } from "../types/user"
import { WHTTP } from "../utils/http"

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
    public static async getFiles(): Promise<TPaginatedResponse<TFile>>
    {
        const res = await WHTTP.get(`/files/records?expand=owner,createdBy,sharedWith`);

        const items = res.data?.items?.map((i: any) => {
            return {
                ...i,
                owner: i?.expand?.owner,
                createdBy: i?.expand?.createdBy,
                sharedWith: i?.expand?.sharedWith
            }
        }) as TFile[];

        return {
            success: res.success,
            message: res.message,
            items: res.success ? items : []
        };
    }

    public static async getFile(id: string): Promise<TResponse<TFile>>
    {
        const res = await WHTTP.get(`/files/records/${id}?expand=owner,createdBy,sharedWith`);

        const data = {
            ...res.data,
            file: res.data?.expand?.file,
            user: res.data?.expand?.user
        } as TFile

        return {
            success: res.success,
            message: res.message,
            data: res.success ? data : null
        };
    }

    public static async getSharedList(fileId: string): Promise<TPaginatedResponse<TUser>>
    {
        const res = await WHTTP.get(`/shared_with/records?filter=(file="${fileId}")&expand=user`);

        const items = res.data?.items?.map((i: any) => {
            return {
                name: i?.expand?.user.name,
                email: i?.expand?.user.email,
                created: i?.expand?.user.created,
                updated: i?.expand?.user.updated,
            }
        }) as TUser[];

        return {
            success: res.success,
            message: res.message,
            items: res.success ? items : []
        };
    }
}
