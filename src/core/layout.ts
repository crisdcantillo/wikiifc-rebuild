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
    private static leftHtml: HTMLElement;
    private static centerHtml: HTMLElement;
    private static rightHtml: HTMLElement;

    constructor() {
        super(html, css);

        WLayout.leftHtml = this.html.querySelector("[name='left']") as HTMLElement;
        WLayout.rightHtml = this.html.querySelector("[name='right']") as HTMLElement;
        WLayout.centerHtml = this.html.querySelector("[name='center']") as HTMLElement;
     }

    public static showModule(name: Module): void
    {
        WLayout.hideAllModules();

        const left = WLayout.leftHtml.querySelector(`[slot='${name}-left']`);
        const center = WLayout.centerHtml.querySelector(`[slot='${name}-center']`);
        const right = WLayout.rightHtml.querySelector(`[slot='${name}-right']`);

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

        WLayout.leftHtml.appendChild(left);
        WLayout.centerHtml.appendChild(center);
        WLayout.rightHtml.appendChild(right);

        return {
            left,
            center,
            right
        }
    }

    private static hideAllModules(): void
    {
        const leftChildren = Array.from(WLayout.leftHtml.children);
        const centerChildren = Array.from(WLayout.centerHtml.children);
        const rightChildren = Array.from(WLayout.rightHtml.children);

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
