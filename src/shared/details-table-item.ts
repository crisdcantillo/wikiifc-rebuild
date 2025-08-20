import WElement from "../core/element";

export class WDetailsTableItem extends WElement
{
    protected label: HTMLParagraphElement;
    protected value: HTMLParagraphElement;

    constructor(label: string, value: string)
    {
        super(html, css);

        this.label = this.element.querySelector("[name='label']") as HTMLParagraphElement;
        this.value = this.element.querySelector("[name='value']") as HTMLParagraphElement;

        this.label.innerText = label;
        this.value.innerText = value;
    }
}

export class WDetailsTableItemEditable extends WDetailsTableItem
{
    constructor(label: string, value: string)
    {
        super(label, value);
    }

    addInput(input: HTMLInputElement | HTMLTextAreaElement): void
    {
        const container = document.createElement("div");
        container.classList.add("w-details-table-item__floating-container");

        this.element.appendChild(input);
        input.value = this.value.innerText;
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-details-table-item">
        <p class="w-details-table-item__label" name="label"></p>
        <p class="w-details-table-item__value" name="value"></p>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-details-table-item
    {
        width: 100%;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        padding: 4px 8px;
        border-bottom: 1px solid rgba(var(--color-white), 0.15);
    }

    .w-details-table-item__label
    {
        font-size: 12px;
        opacity: 0.5;
    }

    .w-details-table-item__value:empty::after
    {
        content: "Empty";
        font-size: 12px;
        font-style: italic;
        opacity: .35;
    }

    /* For floating inputs */
    .w-details-table-item:hover .w-details-table-item__floating-container { display: flex }
    .w-details-table-item__floating-container
    {
        display: none;
        position: absolute;
        padding: 4px 8px;
    }
    `
}
