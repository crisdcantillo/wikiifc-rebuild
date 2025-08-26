import WElement from "../core/element";
import WSlot from "../core/slot";

/**
* @description class with static methods for managing `slots`
*
* @example
* // create a slot:
* const slotFiles = WLayout.addSlot("files");
*
* // then add some content to it:
* slotFiles.left.innerHTML = `<p>Files Module</p>`
*
* // show `left`, `center` and `right` container for `files` slot
* tabFiles.onclick = () =>
* {
*   WLayout.showSlot("left", "files");
*   WLayout.showSlot("center", "files");
*   WLayout.showSlot("right", "files");
* }
*
* // or simply display all slots with one command:
* WLayout.showAllSlots("files");
*/
export default class WLayout extends WElement
{
    private static leftHtml: HTMLElement;
    private static rightHtml: HTMLElement;
    private static centerHtml: HTMLElement;

    private static slots: WSlot[] = [];

    constructor()
    {
        super(html, css);
        WLayout.leftHtml = this.element.querySelector("[name='left']") as HTMLElement;
        WLayout.rightHtml = this.element.querySelector("[name='right']") as HTMLElement;
        WLayout.centerHtml = this.element.querySelector("[name='center']") as HTMLElement;
    }

    public static getSlot(name: string): WSlot | null
    {
        return WLayout.slots.find(s => s.name === name) ?? null;
    }

    public static showAllSlots(name: string): void
    {
        const curr = WLayout.slots.find(s => s.name === name);
        if (!curr) return;

        WLayout.slots.forEach(s => s.hideAll());
        curr?.showAll();
    }

    public static showSideSlots(name: string): void
    {
        const curr = WLayout.slots.find(s => s.name === name);
        if (!curr) return;

        WLayout.slots.forEach(s =>
        {
            s.hide("left");
            s.hide("right");
        });

        curr?.show("left");
        curr?.show("right");
    }

    public static showSlot(side: "left" | "center" | "right", name: string): void
    {
        const curr = WLayout.slots.find(s => s.name === name);
        if (!curr) return;

        WLayout.slots.forEach(s => s.hide(side));
        curr?.show(side);
    }

    public addSlot(name: string): WSlot
    {
        const curr = new WSlot(name);

        WLayout.leftHtml.appendChild(curr.left);
        WLayout.rightHtml.appendChild(curr.right);
        WLayout.centerHtml.appendChild(curr.center);

        WLayout.slots.push(curr);
        return curr;
    }

    public removeSlot(name: string): void
    {
        const currIdx = WLayout.slots.findIndex(s => s.name === name);

        WLayout.slots[currIdx]?.left.remove();
        WLayout.slots[currIdx]?.right.remove();
        WLayout.slots[currIdx]?.center.remove();

        WLayout.slots.splice(currIdx, 0);

    }
}

function html(): string
{
    return /*html*/`
    <div class="w-layout">
        <div class="w-layout__left" name="left"></div>
        <div class="w-layout__center" name="center"></div>
        <div class="w-layout__right" name="right"></div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-layout
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        border-left: 1px solid rgba(var(--color-white), 0.20);
        border-right: 1px solid rgba(var(--color-white), 0.20);
    }

    .w-layout__left
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .w-layout__center
    {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-left: 1px solid rgba(var(--color-white), 0.2);
        border-right: 1px solid rgba(var(--color-white), 0.2);
    }

    .w-layout__right
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* Slots */
    [slot]
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        display: none; /* Hidden by default */
        overflow: auto;
    }

    [slot][visible]
    {
        display: flex;
    }
    `
}
