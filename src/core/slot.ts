export default class WSlot
{
    private id: string;
    private leftHtml: HTMLElement;
    private rightHtml: HTMLElement;
    private centerHtml: HTMLElement;

    constructor(name: string)
    {
        this.id = name;
        this.leftHtml = document.createElement("div");
        this.rightHtml = document.createElement("div");
        this.centerHtml = document.createElement("div");

        this.leftHtml.setAttribute("slot", `${name}-left`);
        this.rightHtml.setAttribute("slot", `${name}-right`);
        this.centerHtml.setAttribute("slot", `${name}-center`);
    }

    public get name(): string
    {
        return this.id;
    }

    public get left(): HTMLElement
    {
        return this.leftHtml;
    }

    public get right(): HTMLElement
    {
        return this.rightHtml;
    }

    public get center(): HTMLElement
    {
        return this.centerHtml;
    }

    public show(side: "left" | "center" | "right"): void
    {
        if (side === "left") this.left.setAttribute("visible", "");
        if (side === "center") this.center.setAttribute("visible", "");
        if (side === "right") this.right.setAttribute("visible", "");
    }

    public hide(side: "left" | "center" | "right"): void
    {
        if (side === "left") this.left.removeAttribute("visible"); 
        if (side === "center") this.center.removeAttribute("visible");
        if (side === "right") this.right.removeAttribute("visible");
    }

    public showAll(): void
    {
        this.left.setAttribute("visible", "");
        this.right.setAttribute("visible", "");
        this.center.setAttribute("visible", "");
    }

    public hideAll(): void
    {
        this.left.removeAttribute("visible");
        this.right.removeAttribute("visible");
        this.center.removeAttribute("visible");
    }
}
