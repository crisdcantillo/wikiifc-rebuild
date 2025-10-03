import WElement from "../../core/element";
import Assets from "../../core/assets";

export default class WTopicItem extends WElement
{
    private icon: HTMLImageElement;
    private name: HTMLParagraphElement;
    private date: HTMLParagraphElement;
    private delete: HTMLButtonElement;

    public onClick: (() => void) | null = null;
    public onDelete: (() => void) | null = null;

    constructor(name: string, date: string)
    {
        super(html, css);

        this.icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        this.name = this.html.querySelector("[name='name']") as HTMLParagraphElement;
        this.date = this.html.querySelector("[name='date']") as HTMLParagraphElement;
        this.delete = this.html.querySelector("[name='delete']") as HTMLButtonElement;
        this.delete.style.backgroundImage = `url(${Assets.trash})`

        this.icon.src = Assets.topic;
        this.name.innerText = name;
        this.date.innerText = date;

        this.html.addEventListener("click", () => this.onEventClick());
        this.delete.addEventListener("click", () => this.onEventDelete());
    }

    private onEventClick(): void
    {
        if (!this.onClick) return;
        this.onClick();
    }

    private onEventDelete(): void
    {
        if (!this.onDelete) return;
        this.onDelete();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-topic-item">
        <img class="w-topic-item__icon" name="icon">
        <div class="w-topic-item__info">
            <p class="w-topic-item__name" name="name"></p>
            <p class="w-topic-item__date" name="date"></p>
        </div>
        <button class="w-topic-item__delete" name="delete"></button>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-topic-item
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

    .w-topic-item:hover { background-color: rgba(var(--color-white), 0.05) }

    .w-topic-item__icon
    {
        width: 28px;
        height: 28px;
    }

    .w-topic-item__info
    {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .w-topic-item__name
    {
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .w-topic-item__date
    {
        font-size: 12px;
        opacity: 0.5;
    }

    .w-topic-item__delete
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

    .w-topic-item__delete:hover { opacity: 1 }
    `
}
