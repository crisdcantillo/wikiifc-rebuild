import WElement from "../core/element";
import Assets from "../core/assets";

export default class WCollapser extends WElement
{
    private head: HTMLElement;
    private title: HTMLParagraphElement;
    private arrow: HTMLImageElement;

    private isOpen: boolean = false;

    constructor(title: string)
    {
        super(html, css);

        this.head = this.html.querySelector("[name='head']") as HTMLElement;
        this.title = this.html.querySelector("[name='title']") as HTMLParagraphElement;
        this.arrow = this.html.querySelector("[name='arrow']") as HTMLImageElement;

        this.arrow.src = Assets.chevronUp;
        this.title.innerText = title;

        this.head.addEventListener("click", () => this.toggle());

        this.open(); // open by default
    }

    public appendContent(content: HTMLElement): void
    {
        content.setAttribute("collapser-content", "");
        this.html.appendChild(content);
    }

    public clearContent(): void
    {
        this.html.lastElementChild?.remove();
    }

    public toggle(): void
    {
        if (this.isOpen) this.close();
        else this.open();
    }

    public open(): void
    {
        this.html.classList.add("open");
        this.arrow.src = Assets.chevronUp;
        this.isOpen = true;
    }

    public close(): void
    {
        this.html.classList.remove("open");
        this.arrow.src = Assets.chevronDown;
        this.isOpen = false;
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-collapser">
        <div class="w-collapser__head" name="head">
            <p class="w-collapser__title" name="title"></p>
            <img class="w-collapser__arrow" name="arrow">
        </div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-collapser
    {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .w-collapser.open [collapser-content] { display: flex }

    .w-collapser [collapser-content]
    {
        display: none;
        flex-direction: column;
    }

    .w-collapser__head
    {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(var(--color-white), 0.05);
        border-bottom: 1px solid rgba(var(--color-white), 0.10);
        padding: 12px 8px;
        padding-left: 12px;
        cursor: pointer;
    }

    .w-collapser__head:hover { background-color: rgba(var(--color-white), 0.10) }

    .w-collapser__arrow
    {
        width: 28px;
        height: 28px;
    }
    `
}
