import WElement from "../core/element";
import Assets from "../utils/assets";

export default class WSpinner extends WElement
{
    constructor()
    {
        super(html, css);

        const icon = this.element.querySelector("[name='icon']") as HTMLImageElement;
        icon.src = Assets.spinner;
    }

    destroy(): void
    {
        this.element.remove();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-spinner">
        <img name="icon">
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-spinner
    {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
    }

    .w-spinner img
    {
        width: 48px;
        height: 48px;
    }
    `
}
