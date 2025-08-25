import WElement from "../../core/element";
import Assets from "../../utils/assets";

export default class WCommentItem extends WElement
{
    private email: HTMLParagraphElement;
    private date: HTMLParagraphElement;
    private text: HTMLParagraphElement;
    private delete: HTMLButtonElement;
    private edit: HTMLButtonElement;

    public onEdit: (() => void) | null = null;
    public onDelete: (() => void) | null = null;

    constructor(email: string, date: string, text: string)
    {
        super(html, css);

        this.email = this.element.querySelector("[name='email']") as HTMLParagraphElement;
        this.date = this.element.querySelector("[name='date']") as HTMLParagraphElement;
        this.text = this.element.querySelector("[name='text']") as HTMLParagraphElement;

        this.edit = this.element.querySelector("[name='edit']") as HTMLButtonElement;
        this.edit.style.backgroundImage = `url(${Assets.edit})`
        this.delete = this.element.querySelector("[name='delete']") as HTMLButtonElement;
        this.delete.style.backgroundImage = `url(${Assets.trash})`

        this.email.innerText = email;
        this.date.innerText = date;
        this.text.innerText = text;

        this.edit.addEventListener("click", () => this.onEventEdit())
        this.delete.addEventListener("click", () => this.onEventDelete())
    }

    private onEventEdit(): void
    {
        if (!this.onEdit) return;
        this.onEdit();
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
    <div class="w-comment-item">
        <p class="w-comment-item__email" name="email"></p>
        <p class="w-comment-item__date" name="date"></p>
        <p class="w-comment-item__text" name="text"></p>
        <div class="w-comment-item__options">
            <button class="w-comment-item__edit" name="edit"></button>
            <button class="w-comment-item__delete" name="delete"></button>
        </div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-comment-item
    {
        width: 100%;
        position: relative;
        padding: 12px;
        border-bottom: 1px solid rgba(var(--color-white), 0.15);
    }

    .w-comment-item__email
    {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;
    }

    .w-comment-item__date
    {
        font-size: 12px;
        opacity: 0.75;
    }

    .w-comment-item__text
    {
        margin-top: 12px;
        opacity: 0.75;
    }

    .w-comment-item__options
    {
        position: absolute;
        right: 12px;
        top: 12px;
        display: none;
        align-items: center;
        gap: 4px;
    }

    .w-comment-item:hover .w-comment-item__options { display: flex }

    .w-comment-item__options > button
    {
        width: 24px;
        height: 24px;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 90%;
        border: none;
        opacity: 0.5;
        cursor: pointer;
    }

    .w-comment-item__options > button:hover { opacity: 1 }
    `
}
