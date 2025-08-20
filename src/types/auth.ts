export type TAuthUser =
{
    token: string,
    record: {
        id: string,
        email: string,
        emailVisibility: boolean,
        verified: boolean,
        name: string,
        avatar: string,
        created: string,
        updated: string
    }
}
