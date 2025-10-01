export default class PersistentStorage
{
    public static saveSessionId(sessionId: string): void
    {
        localStorage.setItem("sessionId", sessionId);
    }

    public static  getSessionId(): string | null
    {
        return localStorage.getItem("sessionId");
    }

    public static  deleteSessionId(): void
    {
        localStorage.removeItem("sessionId");
    }
}
