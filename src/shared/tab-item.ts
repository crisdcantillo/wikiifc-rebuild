import WElement from "../core/element";

export default class WTabItem extends WElement
{
    public onClick: (() => void) | null = null;

    constructor(icon: string, tooltip: string)
    {
        super(html, css)
        this.element.title = tooltip;
        this.element.style.backgroundImage = `url(${icon})`;

        this.element.addEventListener("click", () => this.eventOnClick());
    }

    public get html(): HTMLElement
    {
        return this.element;
    }

    public disable(disabled: boolean)
    {
        if (disabled) this.element.classList.add("disabled");
        else this.element.classList.remove("disabled");
    }

    public setActive(isActive: boolean): void
    {
        if (isActive) this.element.classList.add("active");
        else this.element.classList.remove("active");
    }

    private eventOnClick(): void
    {
        if (!this.onClick) return;
        this.onClick();
    }
}

function html(): string
{
    return /*html*/`
    <button class="w-tab-item"></button>
    `
}

function css(): string
{
    return /*css*/`
    .w-tab-item
    {
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: none;
        background: transparent;
        background-position: center;
        background-size: 65%;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .w-tab-item:hover { background-color: rgba(var(--color-white), 0.1) }
    .w-tab-item.active { background-color: rgba(var(--color-white), 0.15); cursor: default }
    .w-tab-item.active:hover { background-color: rgba(var(--color-white), 0.15)}
    .w-tab-item.disabled { pointer-events: none; opacity: 0.25 }

    /* Bottom */
    .w-tabs__bottom
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 4px;
        padding: 4px;
    }
    `
}
