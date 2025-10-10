import WElement from "../../core/element";
import Assets from "../../core/assets";
import WShareItem from "./share-item";

export default class WShareList extends WElement
{
    private add: HTMLButtonElement;
    private container: HTMLElement;

    public onAddClick: (() => void) | null = null;

    constructor()
    {
        super(html, css);

        this.add = this.html.querySelector("[name='add']") as HTMLButtonElement;
        this.add.style.backgroundImage = `url(${Assets.addCircular})`;
        this.container = this.html.querySelector("[name='container']") as HTMLElement;

        this.add.addEventListener("click", () => this.onEventAddClick());
    }

    public addShareItems(items: WShareItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(item => frag.appendChild(item.html));

        this.container.replaceChildren();
        this.container.appendChild(frag);
    }

    private onEventAddClick(): void
    {
        if (!this.onAddClick) return;
        this.onAddClick();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-share-list">
        <div class="w-share-list__head">
            <input class="w-share-list__search" type="search" name="search" placeholder="Add an email...">
            <button class="w-share-list__add" name="add"></button>
        </div>
        <div class="w-share-list__content" name="container"></div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-share-list
    {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .w-share-list__head
    {
        width: 100%;
        height: 64px;
        min-height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px 10px;
        border-bottom: 1px solid rgba(var(--color-white), 0.15);
    }

    .w-share-list__search
    {
        flex: 1;
        min-width: 0;
        height: 100%;
        background-color: rgba(var(--color-grey), 1);
        border-radius: 4px;
        color: rgba(var(--color-white), 1);
        border: none;
        font-size: 14px;
        padding: 8px 12px;
        outline: none;
    }

    .w-share-list__add
    {
        height: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
        border: none;
        background-position: center;
        background-size: 90%;
        background-repeat: no-repeat;
        border-radius: 4px;
        cursor: pointer;
    }

    .w-share-list__add:hover
    {
        background-color: rgba(var(--color-white), 0.15);
    }
    `
}
