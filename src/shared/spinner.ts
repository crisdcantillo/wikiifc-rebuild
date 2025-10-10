import WElement from "../core/element";
import Assets from "../core/assets";

export default class WSpinner extends WElement
{
    constructor()
    {
        super(html, css);

        const icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        icon.src = Assets.spinner;
    }

    public showInsideOf(parent: HTMLElement): void
    {
        parent.appendChild(this.html);
    }

    public showFloatingInsideOf(parent: HTMLElement)
    {
        const parentIsStatic = getComputedStyle(parent).position === "static";

        if (parentIsStatic)
        {
            this.html.classList.add("floating");
            parent.setAttribute("spinner-parent-floating", "");
        }

        parent.appendChild(this.html);
    }

    public override destroy(): void
    {
        this.html.parentElement?.removeAttribute("spinner-parent-floating");
        this.html.remove();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-spinner">
        <img name="icon">
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-spinner
    {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        background-color: rgba(var(--color-black), 1);
    }

    .w-spinner.floating
    {
        position: absolute;
        inset: 0;
        z-index: 99;
    }

    .w-spinner img
    {
        width: 48px;
        height: 48px;
    }

    [spinner-parent-floating]
    {
        position: relative;
    }
    `
}
