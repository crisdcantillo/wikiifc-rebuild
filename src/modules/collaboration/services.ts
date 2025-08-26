import { TPaginatedResponse, TResponse } from "../../types/response"
import { TUser } from "../../types/user"
import { WHTTP } from "../../utils/http"

type TTopic =
{
    id: string,
    file: string,
    title: string,
    description: string | null,
    priority: string | null,
    status: string | null,
    dueDate: string | null,
    assignedTo: TUser | null,
    created: string,
    createdBy: TUser,
    updated: string | null,
    updatedBy: TUser | null
}

type TComment =
{
    id: string,
    content: string,
    created: string,
    createdBy: TUser,
    updated: string | null,
    updatedBy: TUser | null
}

type TViewpoint =
{
    id: string,
    snapshot: string,
    created: string,
    createdBy: TUser,
    updated: string | null,
    updatedBy: TUser | null
}

export default class CollaborationService
{
    public static async getTopics(fileId: string): Promise<TPaginatedResponse<TTopic>>
    {
        const res = await WHTTP.get(`/topics/records?filter=(file.id="${fileId}")`);

        const items = res.data?.items?.map((i: any) => {
            return {
                ...i,
                assignedTo: i?.expand?.assignedTo,
                createdBy: i?.expand?.createdBy,
                updatedBy: i?.expand?.updatedBy
            }
        }) as TTopic[];

        return {
            success: res.success,
            message: res.message,
            items: res.success ? items : []
        };
    }

    public static async getTopicDetails(topicId: string): Promise<TResponse<TTopic>>
    {
        const res = await WHTTP.get(`/topics/records/${topicId}?expand=assignedTo,createdBy,updatedBy`);

        const data = {
            ...res.data,
            assignedTo: res.data?.expand?.assignedTo,
            createdBy: res.data?.expand?.createdBy,
            updatedBy: res.data?.expand?.updatedBy
        } as TTopic

        return {
            success: res.success,
            message: res.message,
            data: res.success ? data : null
        };
    }

    public static async getTopicComments(topicId: string): Promise<TPaginatedResponse<TComment>>
    {
        const res = await WHTTP.get(`/comments/records?filter=(topic.id="${topicId}")&expand=createdBy,updatedBy`)

        const items = res.data?.items?.map((i: any) => {
            return {
                ...i,
                createdBy: i?.expand?.createdBy,
                updatedBy: i?.expand?.updatedBy
            }
        }) as TComment[];

        return {
            success: res.success,
            message: res.message,
            items: res.success ? items : []
        }
    }

    public static async getTopicViewpoints(fileId: string): Promise<TPaginatedResponse<TViewpoint>>
    {
        const res = await WHTTP.get(`/viewpoints/records?filter=(file.id="${fileId}")&expand=createdBy,updatedBy`);

        const items = res.data?.items?.map((i: any) => {
            return {
                ...i,
                createdBy: i?.expand?.createdBy,
                updatedBy: i?.expand?.updatedBy
            }
        }) as TViewpoint[];

        return {
            success: res.success,
            message: res.message,
            items: res.success ? items : []
        };
    }
}
