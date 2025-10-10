import WElement from "../../core/element";
import WFileItem from "./file-item";

export default class WFileList extends WElement
{
    constructor()
    {
        super(html, css);
    }

    public addFileItems(items: WFileItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(item => frag.appendChild(item.html));

        this.html.replaceChildren();
        this.html.appendChild(frag);
    }

    public clearFileList(): void
    {
        this.html.replaceChildren();
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
