import WElement from "../core/element";
import WTabItem from "../shared/tab-item";
import Assets from "../utils/assets";

export default class WTabs extends WElement
{
    private icon: HTMLImageElement;
    private center: HTMLDivElement;
    private bottom: HTMLDivElement;

    private tabs: WTabItem[] = [];

    constructor()
    {
        super(html, css);

        this.icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        this.center = this.html.querySelector("[name='top']") as HTMLDivElement;
        this.bottom = this.html.querySelector("[name='bottom']") as HTMLDivElement;

        this.icon.src = Assets.brandIcon;
    }

    public addTabs(position: "top" | "bottom", tabs: WTabItem[]): void
    {
        tabs.forEach(tab =>
        {
            if (position === "bottom")
            {
                this.bottom.appendChild(tab.html);
                return;
            }

            tab.html.addEventListener("click", () => this.setActiveTab(tab));
            this.center.appendChild(tab.html);
            this.tabs.push(tab);
        });
    }

    public setActiveTab(tab: WTabItem): void
    {
        this.tabs.forEach(t => t.setActive(false));
        tab.setActive(true);
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
    `
}
