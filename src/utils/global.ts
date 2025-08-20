export enum GlobalEvent
{
    OnModelLoaded = "OnModelLoaded",
    OnModelUnloaded = "OnModelUnloaded",
    OnFileOpened = "OnFileOpened",
    OnFileSelected = "OnFileSelected",
    OnLoggedIn = "OnLoggedIn",
    OnLoggedOut = "OnLoggedOut",
}

export class Global
{
    private static loadedModel: string = ""

    public static get getLoadedModel(): string
    {
        return Global.loadedModel;
    }

    public static dispatchEvent(event: GlobalEvent): void
    {
        window.dispatchEvent(new CustomEvent(event));
    }

    public static listenEvent(event: GlobalEvent, cb: (e: Event) => void): void
    {
        window.addEventListener(event, (e) => cb(e));
    }
}
