export type TResponse<T> =
{
    success: boolean,
    message: string | null,
    data: T | null
}

export type TPaginatedResponse<T> =
{
    success: boolean,
    message: string | null,
    items: T[]
}
