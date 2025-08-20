export default class WPanelHeadOption
{
    private element: HTMLButtonElement;

    public onClick: (() => void) | null = null;

    constructor(icon: string, tooltip: string)
    {
        this.element = document.createElement("button");
        this.element.classList.add("w-panel-head-option");
        this.element.title = tooltip;
        this.element.style.backgroundImage = `url(${icon})`;
        this.element.title = tooltip;

        this.element.addEventListener("click", () => this.onEventClick());
    }

    public get html(): HTMLElement
    {
        return this.element;
    }

    public setEnable(enable: boolean): void
    {
        if (enable) this.element.disabled = true;
        else this.element.disabled = false;
    }

    private onEventClick(): void
    {
        if (!this.onClick) return;
        this.onClick();
    }
}
