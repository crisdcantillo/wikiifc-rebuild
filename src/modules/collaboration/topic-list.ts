import WElement from "../../core/element";
import WTopicItem from "./topic-item";

export default class WTopicList extends WElement
{
    constructor()
    {
        super(html, css);
    }

    public addTopicItems(items: WTopicItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(item => frag.appendChild(item.html));

        this.html.replaceChildren();
        this.html.appendChild(frag);
    }

    public clearTopicList(): void
    {
        this.html.replaceChildren();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-topic-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-topic-list
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    `
}
