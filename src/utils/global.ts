export enum GlobalEvent
{
    OnFileOpened = "OnFileOpened",
    OnFileSelected = "OnFileSelected",
    OnLoggedIn = "OnLoggedIn",
    OnLoggedOut = "OnLoggedOut"
}

export class Global
{
    private static _loadedModel: string = ""

    public static getLoadedModel(): string
    {
        return Global._loadedModel;
    }

    public static setLoadedModel(fileId: string): void
    {
        Global._loadedModel = fileId;
    }

    public static dispatchEvent(event: GlobalEvent): void
    {
        window.dispatchEvent(new CustomEvent(event));
    }

    public static listenEvent(event: GlobalEvent, cb: () => void): void
    {
        window.addEventListener(event, () => cb());
    }
}
