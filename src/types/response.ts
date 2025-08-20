export type TResponse<T> =
{
    success: boolean,
    message: string | "",
    data: T | null
}

export type TPaginatedResponse<T> =
{
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: T[]
}
