import WElement from "../../core/element";
import Assets from "../../core/assets";

export default class WShareItem extends WElement
{
    private name: HTMLParagraphElement;
    private email: HTMLParagraphElement;
    private delete: HTMLButtonElement;

    public onClick: (() => void) | null = null;
    public onDelete: (() => void) | null = null;

    constructor(name: string, email: string)
    {
        super(html, css);

        this.name = this.html.querySelector("[name='name']") as HTMLParagraphElement;
        this.email = this.html.querySelector("[name='email']") as HTMLParagraphElement;
        this.delete = this.html.querySelector("[name='delete']") as HTMLButtonElement;

        this.name.innerText = name;
        this.email.innerText = email;
        this.delete.style.backgroundImage = `url(${Assets.trash})`;

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
    <div class="w-share-item">
        <div class="w-share-item__info">
            <p class="w-share-item__name" name="name"></p>
            <p class="w-share-item__email" name="email"></p>
        </div>
        <button class="w-share-item__delete" name="delete"></button>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-share-item
    {
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 8px 6px;
        padding-left: 10px;
        border-bottom: 1px solid rgba(var(--color-white), 0.15);
        cursor: pointer;
    }

    .w-share-item:hover { background-color: rgba(var(--color-white), 0.05) }

    .w-share-item__info
    {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .w-share-item__name
    {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .w-share-item__email
    {
        font-size: 12px;
        opacity: 0.5;
    }

    .w-share-item__delete
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

    .w-share-item__delete:hover { opacity: 1 }
    `
}
