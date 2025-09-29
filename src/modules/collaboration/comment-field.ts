import WElement from "../../core/element";
import Assets from "../../utils/assets";

export default class WCommentField extends WElement
{
    private textarea: HTMLTextAreaElement;
    private cta: HTMLButtonElement;
    private ghostCta: HTMLButtonElement;

    public onInput: (() => void) | null = null;
    public onSubmit: (() => void) | null = null;

    constructor()
    {
        super(html, css);

        this.textarea = this.html.querySelector("[name='textarea']") as HTMLTextAreaElement;
        this.cta = this.html.querySelector("[name='cta']") as HTMLButtonElement;
        this.ghostCta = this.html.querySelector("[name='ghost-cta']") as HTMLButtonElement;

        this.cta.style.backgroundImage = `url(${Assets.saveComment})`;
        this.ghostCta.style.backgroundImage = `url(${Assets.saveComment})`;

        this.textarea.addEventListener("input", () => this.onEventInput())
        this.cta.addEventListener("click", () => this.onEventSubmit())
    }

    private showFullField(show: boolean): void
    {
        if (show) this.html.classList.add("not-empty");
        else this.html.classList.remove("not-empty");
    }

    private onEventInput(): void
    {
        if (this.textarea.value.length > 0) this.showFullField(true);
        else this.showFullField(false);

        if (!this.onInput) return;
        this.onInput();
    }

    private onEventSubmit(): void
    {
        if (!this.onSubmit) return;
        this.onSubmit();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-comment-field">
        <textarea class="w-comment-field__textarea" name="textarea" rows="1" placeholder="Type something..."></textarea>
        <button class="w-comment-field__ghost-cta" name="ghost-cta"></button>
        <div class="w-comment-field__options" name="options">
            <button class="w-comment-field__cta" name="cta"></button>
        </div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-comment-field
    {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 4px;
        padding: 12px;
    }

    .w-comment-field__textarea
    {
        font-size: 14px;
        font-weight: normal;
        color: rgba(var(--color-white), 1);
        background-color: rgba(var(--color-darkgrey), 1);
        border: none;
        border-radius: 4px;
        outline: none;
        padding: 12px;
        resize: none;
    }

    .w-comment-field__ghost-cta,
    .w-comment-field__cta
    {
        width: 28px;
        height: 28px;
        background-color: transparent;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
    }

    .w-comment-field__ghost-cta
    {
        position: absolute;
        right: 20px;
        opacity: 0.25;
        cursor: default;
    }

    .w-comment-field__options
    {
        width: 100%;
        display: none;
        justify-content: flex-end;
        align-items: center;
        background-color: rgba(var(--color-darkgrey), 1);
        border-top: 1px solid rgba(var(--color-white), 0.15);
        border-radius: 0px 0px 4px 4px;
        padding: 8px;
    }

    .w-comment-field.not-empty .w-comment-field__options { display: flex }
    .w-comment-field.not-empty .w-comment-field__textarea { border-radius: 4px 4px 0px 0px }
    .w-comment-field.not-empty .w-comment-field__ghost-cta { display: none }
    `
}
