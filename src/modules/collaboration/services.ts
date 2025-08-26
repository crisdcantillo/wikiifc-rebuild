import { TPaginatedResponse, TResponse } from "../../types/response"
import { TUser } from "../../types/user"
import { WHTTP } from "../../utils/http"

type TTopic =
{
    id: string,
    file: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    dueDate: string,
    assignedTo: string,
    created: string,
    createdBy: string,
    updated: string,
    updatedBy: string
    expand?: {
        assignedTo?: TUser,
        createdBy?: TUser,
        updatedBy?: TUser
    }
}

type TComment =
{
    id: string,
    content: string,
    created: string,
    createdBy: string,
    updated: string,
    updatedBy: string
}

type TViewpoint =
{
    id: string,
    snapshot: string,
    created: string,
    createdBy: string,
    updated: string,
    updatedBy: string
}

export default class CollaborationService
{
    public static async getTopics(fileId: string): Promise<TPaginatedResponse<TTopic>>
    {
        const data = await WHTTP.get(`/topics/records?filter=(file.id="${fileId}")`) as TPaginatedResponse<TTopic>;
        return data;
    }

    public static async getTopicDetails(topicId: string): Promise<TResponse<TTopic>>
    {
        const data = await WHTTP.get(`/topics/records/${topicId}?expand=assignedTo,createdBy,updatedBy`) as TTopic;
        return {
            success: true,
            message: "",
            data: data
        };
    }

    public static async getTopicComments(topicId: string): Promise<TPaginatedResponse<TComment>>
    {
        const data = await WHTTP.get(`/comments/records?filter=(topic.id="${topicId}")`) as TPaginatedResponse<TComment>;
        return data;
    }

    public static async getTopicViewpoints(fileId: string): Promise<TPaginatedResponse<TViewpoint>>
    {
        const data = await WHTTP.get(`/viewpoints/records?filter=(file.id="${fileId}")`) as TPaginatedResponse<TViewpoint>;
        return data;
    }
}
