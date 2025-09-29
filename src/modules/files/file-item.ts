import WElement from "../../core/element";
import Assets from "../../utils/assets";

type WFileItemStatus = "default" | "downloading" | "error" | "opened";

export default class WFileItem extends WElement
{
    private itemId: string;

    private icon: HTMLImageElement;
    private name: HTMLParagraphElement;
    private date: HTMLParagraphElement;
    private delete: HTMLButtonElement;

    public onClick: (() => void) | null = null;
    public onDoubleClick: (() => void) | null = null;
    public onDelete: (() => void) | null = null;

    private clickTimer: number | undefined;

    constructor(id: string, name: string, date: string)
    {
        super(html, css);

        this.icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        this.name = this.html.querySelector("[name='name']") as HTMLParagraphElement;
        this.date = this.html.querySelector("[name='date']") as HTMLParagraphElement;
        this.delete = this.html.querySelector("[name='delete']") as HTMLButtonElement;
        this.delete.style.backgroundImage = `url(${Assets.trash})`

        this.itemId = id;
        this.icon.src = Assets.file;
        this.name.innerText = name;
        this.date.innerText = date;

        this.html.addEventListener("click", (e) =>
        {
            clearTimeout(this.clickTimer);
            this.clickTimer = setTimeout(() =>
            {
                this.onEventClick(e);
            }, 200)
        })

        this.html.addEventListener("dblclick", (e) =>
        {
            clearTimeout(this.clickTimer);
            this.onEventDoubleClick(e);
        })

        this.delete.addEventListener("click", (e) => this.onEventDelete(e))
    }

    public get id(): string
    {
        return this.itemId;
    }

    public setStatus(status: WFileItemStatus): void
    {
        switch (status) {
            case "default":
                this.icon.src = Assets.file;
                break;
            case "downloading":
                this.icon.src = Assets.fileDownloading;
                break;
            case "error":
                this.icon.src = Assets.fileError;
                break;
            case "opened":
                this.icon.src = Assets.fileOpened;
                break;
        }
    }

    private onEventClick(e: Event): void
    {
        e.stopPropagation();
        if (!this.onClick) return;
        this.onClick();
    }

    private onEventDoubleClick(e: Event): void
    {
        e.stopPropagation();
        if (!this.onDoubleClick) return;
        this.onDoubleClick();
    }

    private onEventDelete(e: Event): void
    {
        e.stopPropagation();
        if (!this.onDelete) return;
        this.onDelete();
    }
}

function html(): string
{
    return /*html*/ `
    <div class="w-file-item">
        <img class="w-file-item__icon" name="icon">
        <div class="w-file-item__info">
            <p class="w-file-item__name" name="name"></p>
            <p class="w-file-item__date" name="date"></p>
        </div>
        <button class="w-file-item__delete" name="delete"></button>
    </div>
    `
}

function css(): string
{
    return /*css*/ `
    .w-file-item
    {
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        padding: 12px 8px;
        border-bottom: 1px solid rgba(var(--color-white), 0.15);
        cursor: pointer;
    }

    .w-file-item:hover { background-color: rgba(var(--color-white), 0.05) }
    .w-file-item.active { background-color: rgba(var(--color-white), 0.05) }

    .w-file-item__icon
    {
        width: 28px;
        height: 28px;
    }

    .w-file-item__info
    {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .w-file-item__name
    {
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .w-file-item__date
    {
        font-size: 12px;
        opacity: 0.5;
    }

    .w-file-item__delete
    {
        min-width: 32px;
        min-height: 32px;
        border: none;
        border-radius: 4px;
        background-color: transparent;
        background-size: 28px;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.5;
        cursor: pointer;
    }

    .w-file-item__delete:hover { opacity: 1 }
    `
}
