import WElement from "../../core/element";
import WCommentItem from "./comment-item";

export default class WCommentList extends WElement
{
    constructor()
    {
        super(html, css);
    }

    public addCommentItems(items: WCommentItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(item => frag.appendChild(item.html));

        this.html.replaceChildren();
        this.html.appendChild(frag);
    }

    public clearCommentList(): void
    {
        this.html.replaceChildren();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-comment-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-comment-list
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    `
}
