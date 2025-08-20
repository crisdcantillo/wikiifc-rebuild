import WElement from "../core/element";
import WPanelHeadOption from "./panel-head-option";

export default class WPanelHead extends WElement
{
    private title: HTMLParagraphElement;
    private options: HTMLElement;

    constructor(title: string)
    {
        super(html, css);

        this.title = this.element.querySelector("[name='title']") as HTMLParagraphElement;
        this.options = this.element.querySelector("[name='options']") as HTMLElement;
        this.title.innerText = title;
    }

    public addOptions(options: WPanelHeadOption[]): void
    {
        options.forEach(o => this.options.appendChild(o.html));
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-panel-head">
        <p class="w-panel-head__title" name="title"></p>
        <div class="w-panel-head__options" name="options"></div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-panel-head
    {
        min-height: 48px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 0px 6px 0px 12px;
        background-color: rgba(var(--color-white), 0.05);
        border-bottom: 1px solid rgba(var(--color-white), 0.20);
    }

    .w-panel-head__title
    {
        font-weight: 600;
    }

    .w-panel-head__options
    {
        display: flex;
        gap: 4px;
    }

    .w-panel-head-option
    {
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 75%;
        border: none;
        cursor: pointer;
    }

    .w-panel-head-option:hover { background-color: rgba(var(--color-white), 0.10) }
    `
}
