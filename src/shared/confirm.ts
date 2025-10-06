import WElement from "../core/element";
import Assets from "../core/assets";

export default class WConfirm extends WElement
{
    private confirmation: HTMLElement;
    private overlay: HTMLElement;
    private text: HTMLParagraphElement;
    private confirm: HTMLButtonElement;
    private cancel: HTMLButtonElement;

    public onConfirm: (() => void) | null = null;
    public onCancel: (() => void) | null = null;

    constructor(parent: HTMLElement, text: string)
    {
        super(html, css);

        this.confirmation = this.html.querySelector("[name='confirmation']") as HTMLElement;
        this.overlay = this.html.querySelector("[name='overlay']") as HTMLElement;
        this.text = this.html.querySelector("[name='text']") as HTMLParagraphElement;
        this.confirm = this.html.querySelector("[name='confirm']") as HTMLButtonElement;
        this.cancel = this.html.querySelector("[name='cancel']") as HTMLButtonElement;

        this.text.innerText = text;
        this.confirm.style.backgroundImage = `url(${Assets.check})`;
        this.cancel.style.backgroundImage = `url(${Assets.cross})`;

        this.confirm.addEventListener("click", () => this.onEventConfirm());
        this.cancel.addEventListener("click", () => this.onEventCancel());

        document.body.appendChild(this.html);
        this.overlay.addEventListener("click", () => this.onEventClickOutside());

        this.setPosition(parent);
    }

    private setPosition(parent: HTMLElement): void
    {
        const elWidth = this.confirmation.clientWidth;
        const leftPos = parent.offsetLeft;
        const topPos = parent.offsetTop;
        const height = parent.clientHeight;
        const width = parent.clientWidth;
        const offset = 8;

        const isThereEnoughSpaceAtRight = leftPos + elWidth < window.innerWidth;

        if (isThereEnoughSpaceAtRight)
        {
            this.confirmation.style.left = `${leftPos + width + offset}px`;
        }
        else
        {
            this.confirmation.style.left = `${leftPos - elWidth - offset}px`;
            this.confirmation.classList.add("reverse");
        }

        this.confirmation.style.top = `${topPos + (height / 2)}px`;
    }

    private onEventClickOutside(): void
    {
        this.destroy();
    }

    private onEventConfirm(): void
    {
        if (!this.onConfirm) return;
        this.onConfirm();
        this.destroy();
    }

    private onEventCancel(): void
    {
        if (!this.onCancel) return this.destroy();
        this.onCancel();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-confirmation-container">
        <div class="w-confirmation-overlay" name="overlay"></div>
        <div class="w-confirmation" name="confirmation">
            <div class="w-confirmation__options">
                <button class="w-confirmation__confirm" name="confirm"></button>
                <button class="w-confirmation__cancel" name="cancel"></button>
            </div>
            <p class="w-confirmation__text" name="text"></p>
        </div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-confirmation-container
    {
        position: fixed;
        inset: 0;
    }

    .w-confirmation-overlay
    {
        width: 100%;
        height: 100%;
        background-color: rgba(var(--color-black), 0.65);
    }

    .w-confirmation
    {
        max-width: 350px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(var(--color-darkgrey), 1);
        border-radius: 4px;
        box-shadow: 0px 2px 4px rgba(var(--color-black), 0.75);
        border: 1px solid rgba(var(--color-white), 0.15);
        transform: translateY(-50%);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 1);
    }

    .w-confirmation.reverse { flex-direction: row-reverse }
    .w-confirmation.reverse .w-confirmation__options { flex-direction: row-reverse }

    .w-confirmation__text { padding: 12px }

    .w-confirmation__options
    {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px;
    }

    .w-confirmation__confirm,
    .w-confirmation__cancel
    {
        width: 32px;
        height: 32px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 85%;
        background-color: transparent;
        border-radius: 4px;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .w-confirmation__confirm:hover,
    .w-confirmation__cancel:hover
    {
        background-color: rgba(var(--color-white), 0.15);
    }
    `
}
