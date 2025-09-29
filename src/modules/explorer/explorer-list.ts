import WElement from "../../core/element";

export default class WExplorerList extends WElement
{
    constructor()
    {
        super(html, css);
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-explorer-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-explorer-list
    {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    `
}
