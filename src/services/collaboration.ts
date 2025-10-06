import PersistentStorage from "../core/storage"
import { TUser } from "../types/user"
import { WRes, WHTTP } from "../utils/http"

type TTopic =
{
    guid: string,
    title: string,
    description: string | null,
    priority: string | null,
    topic_status: string | null,
    due_date: string | null,
    assigned_to: string | null,
    creation_date: string,
    creation_author: string,
    modified_date: string | null,
    modified_author: string | null
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
    public static async getTopics(projectId: string): Promise<WRes<TTopic[]>>
    {
        const res = await WHTTP.request<TTopic[]>
        ({
            method: "GET",
            endpoint: `/bcf/3.0/projects/${projectId}/topics`,
            headers: { "sessionid": PersistentStorage.getSessionId() ?? "" }
        });

        return res;
    }

    public static async getTopicDetails(projectId: string, topicId: string): Promise<WRes<TTopic>>
    {
        const res = await WHTTP.request<TTopic>
        ({
            method: "GET",
            endpoint: `/bcf/3.0/projects/${projectId}/topics/${topicId}`,
            headers: { "sessionid": PersistentStorage.getSessionId() ?? "" }
        });

        return res;
    }

    public static async getTopicComments(projectId: string, topicId: string): Promise<WRes<TComment[]>>
    {
        const res = await WHTTP.request<TComment[]>
        ({
            method: "GET",
            endpoint: `/bcf/3.0/projects/${projectId}/topics/${topicId}/comments`,
            headers: { "sessionid": PersistentStorage.getSessionId() ?? "" }
        });

        return res;
    }

    public static async getTopicViewpoints(projectId: string, topicId: string): Promise<WRes<TViewpoint[]>>
    {
        const res = await WHTTP.request<TViewpoint[]>
        ({
            method: "GET",
            endpoint: `/bcf/3.0/projects/${projectId}/topics/${topicId}/viewpoints`
        });

        return res;
    }
}
