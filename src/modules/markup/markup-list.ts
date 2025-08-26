import WElement from "../../core/element";

export default class WMarkupList extends WElement
{
    constructor()
    {
        super(html, css);
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-markup-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-markup-list
    {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    `
}
