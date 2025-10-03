import WElement from "../core/element";
import Assets from "../core/assets";

export default class WEmpty extends WElement
{
    private icon: HTMLImageElement;
    private text: HTMLParagraphElement;

    constructor(type: "info" | "warning", text: string)
    {
        super(html, css);

        this.icon = this.html.querySelector("[name='icon']") as HTMLImageElement;
        this.text = this.html.querySelector("[name='text']") as HTMLParagraphElement;

        switch (type)
        {
            case "info":
                this.icon.src = Assets.statusInfo;
                break;
            case "warning":
                this.icon.src = Assets.statusWarning;
                break;
        }

        this.text.innerText = text;
    }

    public destroy(): void
    {
        this.html.remove();
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-empty">
        <img class="w-empty__icon" name="icon">
        <p class="w-empty__text" name="text"></p>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-empty
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        opacity: .35;
        padding: 40px;
    }

    .w-empty__icon
    {
        width: 60px;
        aspect-ratio: 1/1;
    }

    .w-empty__text
    {
        text-align: center;
    }
    `
}
