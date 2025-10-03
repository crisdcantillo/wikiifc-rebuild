import WElement from "../core/element";
import Assets from "../core/assets";

export class WTabs extends WElement
{
    private icon: HTMLImageElement;
    private top: HTMLDivElement;
    private bottom: HTMLDivElement;

    constructor()
    {
        super(html, css);

        this.icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        this.top = this.html.querySelector("[name='top']") as HTMLDivElement;
        this.bottom = this.html.querySelector("[name='bottom']") as HTMLDivElement;

        this.icon.src = Assets.brandIcon;
    }

    public addTab(position: "top" | "bottom", name: string, icon: string, cb?: (() => void) | null): HTMLButtonElement
    {
        const tab = document.createElement("button");

        tab.classList.add("w-tab-item");
        tab.setAttribute("tab", name);
        const capitalizedName = name[0].toUpperCase() + name.substring(1);
        tab.title = capitalizedName;
        tab.style.backgroundImage = `url(${icon})`;

        switch (position)
        {
            case "top":
                this.top.appendChild(tab);
                break;
            case "bottom":
                this.bottom.appendChild(tab);
                break;
        }

        tab.addEventListener("click", () => cb ? cb() : null);
        return tab;
    }

    public getTabByName(tabName: string): HTMLButtonElement | null
    {
        const tab = this.html.querySelector(`[tab='${tabName}']`) as HTMLButtonElement;
        return tab ?? null;
    }

    public setActiveTab(tab: HTMLButtonElement): void
    {
        Array.from(this.top.children).forEach(t => t.classList.remove("active"));
        Array.from(this.bottom.children).forEach(t => t.classList.remove("active"));

        tab.classList.add("active");
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-tabs">
        <div class="w-tabs__icon-container">
            <img class="w-tabs__icon" name="icon" />
        </div>
        <div class="w-tabs__top" name="top"></div>
        <div class="w-tabs__bottom" name="bottom"></div>
    </div>
    `
}


function css(): string
{
    return /*css*/`
    /* TABS */
    .w-tabs
    {
        min-width: 48px;
        height: 100vh;
        background-color: rgba(var(--color-black), 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-right: 1px solid rgba(var(--color-white), 0.20);
    }

    /* Icon Container */
    .w-tabs__icon-container
    {
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(var(--color-white), 0.05);
        border-bottom: 1px solid rgba(var(--color-white), 0.2);
    }

    .w-tabs__icon
    {
        width: 24px;
        height: 24px;
    }

    .w-tabs__icon svg
    {
        width: 100%;
        height: 100%;
    }

    /* Top */
    .w-tabs__top
    {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 4px;
        padding: 4px;
    }

    /* Tab Item */
    .w-tab-item
    {
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: none;
        background: transparent;
        background-position: center;
        background-size: 65%;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .w-tab-item:hover { background-color: rgba(var(--color-white), 0.1) }
    .w-tab-item.active { background-color: rgba(var(--color-white), 0.15); cursor: default }
    .w-tab-item.active:hover { background-color: rgba(var(--color-white), 0.15)}
    .w-tab-item[disabled] { pointer-events: none; opacity: 0.25 }

    /* Bottom */
    .w-tabs__bottom
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 4px;
        padding: 4px;
    }
    `
}
