import WElement from "../core/element";

export enum Module
{
    Auth = "auth",
    Files = "files",
    Explorer = "explorer",
    Collaboration = "collaboration",
    Settings = "settings"
}

export class WLayout extends WElement {
    private leftHtml: HTMLElement;
    private centerHtml: HTMLElement;
    private rightHtml: HTMLElement;

    constructor() {
        super(html, css);

        this.leftHtml = this.html.querySelector("[name='left']") as HTMLElement;
        this.rightHtml = this.html.querySelector("[name='right']") as HTMLElement;
        this.centerHtml = this.html.querySelector("[name='center']") as HTMLElement;
     }

    public showModule(name: Module): void
    {
        this.hideAllModules();

        const left = this.leftHtml.querySelector(`[slot='${name}-left']`);
        const center = this.centerHtml.querySelector(`[slot='${name}-center']`);
        const right = this.rightHtml.querySelector(`[slot='${name}-right']`);

        left?.setAttribute("visible", "");
        center?.setAttribute("visible", "");
        right?.setAttribute("visible", "");
    }

    public createPanels(name: Module): { left: HTMLElement, center: HTMLElement, right: HTMLElement }
    {
        const left = document.createElement("div");
        const center = document.createElement("div");
        const right = document.createElement("div");

        left.setAttribute("slot", `${name}-left`);
        center.setAttribute("slot", `${name}-center`);
        right.setAttribute("slot", `${name}-right`);

        this.leftHtml.appendChild(left);
        this.centerHtml.appendChild(center);
        this.rightHtml.appendChild(right);

        return {
            left,
            center,
            right
        }
    }

    private hideAllModules(): void
    {
        const leftChildren = Array.from(this.leftHtml.children);
        const centerChildren = Array.from(this.centerHtml.children);
        const rightChildren = Array.from(this.rightHtml.children);

        leftChildren.forEach(c => c.removeAttribute("visible"));
        centerChildren.forEach(c => c.removeAttribute("visible"));
        rightChildren.forEach(c => c.removeAttribute("visible"));
    }
}

function html(): string {
    return /*html*/`
    <div class="w-tabbed-layout">
        <div class="w-tabbed-layout__left" name="left"></div>
        <div class="w-tabbed-layout__center" name="center"></div>
        <div class="w-tabbed-layout__right" name="right"></div>
    </div>
    `
}

function css(): string {
    return /*css*/`
    .w-tabbed-layout
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        border-left: 1px solid rgba(var(--color-white), 0.20);
        border-right: 1px solid rgba(var(--color-white), 0.20);
    }

    .w-tabbed-layout__left
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .w-tabbed-layout__center
    {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-left: 1px solid rgba(var(--color-white), 0.2);
        border-right: 1px solid rgba(var(--color-white), 0.2);
        position: relative;
    }

    .w-tabbed-layout__right
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* Slots */
    [slot]
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        display: none; /* Hidden by default */
        overflow: auto;
    }

    [slot][visible]
    {
        display: flex;
    }
    `
}
