import UToken from "./token";

export class WHTTP
{
    private static API = "http://127.0.0.1:8090/api/collections";

    public static async get(endpoint: string): Promise<object>
    {
        return fetch(`${WHTTP.API}${endpoint}`, {
            headers: {
                "Authorization": `Bearer ${UToken.token}`,
                "Content-Type": "application/json"
            }
        })
        .then(async res => await res.json())
        .catch(() => {})
    }

    public static async post(endpoint: string, body: object): Promise<object>
    {
        return fetch(`${WHTTP.API}${endpoint}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${UToken.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(async res => await res.json())
        .catch(() => {})
    }

    public static async patch(endpoint: string, body: object): Promise<object>
    {
        return fetch(`${WHTTP.API}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${UToken.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(async res => await res.json())
        .catch(() => {})
    }

    public static async delete(endpoint: string, body: object): Promise<object>
    {
        return fetch(`${WHTTP.API}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${UToken.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(async res => await res.json())
        .catch(() => {})
    }
}
