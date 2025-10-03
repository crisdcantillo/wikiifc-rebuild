import WElement from "../core/element";
import { WDetailsTableItem } from "./details-table-item";

export default class WDetailsTable extends WElement
{
    private items: WDetailsTableItem[] = [];

    constructor()
    {
        super(html, css);
    }

    public addItems(items: WDetailsTableItem[]): void
    {
        const frag = document.createDocumentFragment();
        items.forEach(i =>
        {
            frag.appendChild(i.html);
            this.items.push(i);
        });

        this.html.append(frag);
    }

    public clear(): void
    {
        this.items = [];
        this.html.replaceChildren();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-details-table"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-details-table
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    `
}
