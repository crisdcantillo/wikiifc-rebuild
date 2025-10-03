import { API } from "../api";

export type WRes<T> =
{
    success: boolean,
    code?: number | null,
    error?: string | null,
    data?: T | null
}

export class WHTTP
{
    public static async request<T>(req: { method: "GET" | "POST", endpoint: string, body?: any | null, headers?: HeadersInit | null }): Promise<WRes<T>>
    {
        try
        {
            const res = await fetch(`${API}${req.endpoint}`,
            {
                method: req.method,
                headers:
                {
                    "Content-Type": "application/json",
                    ...req.headers ?? {}
                },
                body: req.body
            });

            let data;
            try { data = await res.json() }
            catch { data = null }

            return {
                success: res.ok,
                code: res.status,
                error: res.ok ? null : "Something unexpected happened...",
                data: data
            }
        }
        catch
        {
            return {
                success: false,
                code: 500,
                error: "We did something wrong, please contact us if the issue persists",
                data: null
            };
        }
    }
}
