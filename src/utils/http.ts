import UToken from "./token";

export type WHTTPResponse =
{
    success: boolean,
    message: string | null,
    data: any
}

export class WHTTP
{
    private static API = "http://127.0.0.1:8090/api/collections";

    // HTTP verbs
    public static async get(endpoint: string): Promise<WHTTPResponse> { return WHTTP.request("GET", endpoint) }
    public static async post(endpoint: string, body: object): Promise<WHTTPResponse> { return WHTTP.request("POST", endpoint, body) }
    public static async patch(endpoint: string, body: object): Promise<WHTTPResponse> { return WHTTP.request("PATCH", endpoint, body) }
    public static async delete(endpoint: string, body: object): Promise<WHTTPResponse> { return WHTTP.request("DELETE", endpoint, body) }

    private static async request(method: string, endpoint: string, body: any = null): Promise<WHTTPResponse>
    {
        return fetch(`${WHTTP.API}${endpoint}`, {
            method: method,
            headers: {
                "Authorization": `Bearer ${UToken.token}`,
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
        })
        .then(async res =>
        {
            return {
                success: res.status < 300 ? true : false,
                message: res.status < 300 ? null : "There's something wrong with this request...",
                data: res.status < 300 ? await res.json() : null
            }
        }).catch(() =>
        {
            return {
                success: false,
                message: "Something went wrong, please try again later",
                data: null
            }
        })
    }
}
