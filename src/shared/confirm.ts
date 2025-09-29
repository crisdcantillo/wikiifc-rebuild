import WElement from "../core/element";
import Assets from "../utils/assets";

export default class WConfirm extends WElement
{
    private text: HTMLParagraphElement;
    private confirm: HTMLButtonElement;
    private cancel: HTMLButtonElement;

    public onConfirm: (() => void) | null = null;
    public onCancel: (() => void) | null = null;

    constructor(parent: HTMLElement, direction: "left" | "right", text: string)
    {
        super(html, css);

        this.text = this.html.querySelector("[name='text']") as HTMLParagraphElement;
        this.confirm = this.html.querySelector("[name='confirm']") as HTMLButtonElement;
        this.cancel = this.html.querySelector("[name='cancel']") as HTMLButtonElement;

        this.text.innerText = text;
        this.confirm.style.backgroundImage = `url(${Assets.check})`;
        this.cancel.style.backgroundImage = `url(${Assets.cross})`;

        this.confirm.addEventListener("click", () => this.onEventConfirm());
        this.cancel.addEventListener("click", () => this.onEventCancel());

        this.setPosition(parent, direction);
        document.body.appendChild(this.html);
        document.body.addEventListener("click", (e) => this.onEventClickOutside(e));
    }

    private setPosition(parent: HTMLElement, direction: "left" | "right"): void
    {
        const leftPos = parent.offsetLeft;
        const topPos = parent.offsetTop;
        const height = parent.clientHeight;
        const width = parent.clientWidth;

        const dir = direction === "left" ? 1 : -1;
        const offset = 12;

        this.html.style.left = `${leftPos + (width * dir + offset)}px`;
        this.html.style.top = `${topPos + (height / 2)}px`;
    }

    private onEventClickOutside(e: MouseEvent): void
    {
        const target = e.target as HTMLElement;
        if (target === this.html) return;

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
        if (!this.onCancel) return;
        this.onCancel();
        this.destroy();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-confirmation">
        <p class="w-confirmation__text" name="text"></p>
        <div class="w-confirmation__options">
            <button class="w-confirmation__confirm" name="confirm"></button>
            <button class="w-confirmation__cancel" name="cancel"></button>
        </div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-confirmation
    {
        max-width: 350px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        background-color: rgba(var(--color-darkgrey), 1);
        border-radius: 4px;
        box-shadow: 0px 2px 4px rgba(var(--color-black), 0.75);
        border: 1px solid rgba(var(--color-white), 0.15);
        transform: translateY(-50%);
    }

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
