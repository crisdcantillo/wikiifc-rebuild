import WElement from "../../core/element";
import WFileItem from "./file-item";

export default class WFileList extends WElement
{
    constructor()
    {
        super(html, css);
    }

    public addItems(items: WFileItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(i => frag.appendChild(i.html));

        this.element.replaceChildren();
        this.element.appendChild(frag);
    }

    public clear(): void
    {
        this.element.replaceChildren();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-file-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-file-list
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    `
}
