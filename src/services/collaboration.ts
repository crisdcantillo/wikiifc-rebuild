import { TUser } from "../types/user"
import { WRes, WHTTP } from "../utils/http"

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
    public static async getTopics(fileId: string): Promise<WRes<TTopic[]>>
    {
        const res = await WHTTP.request<TTopic[]>
        ({
            method: "GET",
            endpoint: `/topics/records?filter=(file.id="${fileId}")`
        });

        return res;
    }

    public static async getTopicDetails(topicId: string): Promise<WRes<TTopic>>
    {
        const res = await WHTTP.request<TTopic>
        ({
            method: "GET",
            endpoint: `/topics/records/${topicId}?expand=assignedTo,createdBy,updatedBy`
        });

        return res;
    }

    public static async getTopicComments(topicId: string): Promise<WRes<TComment[]>>
    {
        const res = await WHTTP.request<TComment[]>
        ({
            method: "GET",
            endpoint: `/comments/records?filter=(topic.id="${topicId}")&expand=createdBy,updatedBy`
        });

        return res;
    }

    public static async getTopicViewpoints(fileId: string): Promise<WRes<TViewpoint[]>>
    {
        const res = await WHTTP.request<TViewpoint[]>
        ({
            method: "GET",
            endpoint: `/viewpoints/records?filter=(file.id="${fileId}")&expand=createdBy,updatedBy`
        });

        return res;
    }
}
