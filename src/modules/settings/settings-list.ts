import WElement from "../../core/element";

export default class WSettingsList extends WElement
{
    constructor()
    {
        super(html, css);
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-settings-list"></div>
    `
}

function css(): string
{
    return /*css*/`
    .w-settings-list
    {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    `
}
