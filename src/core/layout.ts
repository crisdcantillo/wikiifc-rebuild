import WElement from "../core/element";
import WSlot from "../core/slot";
import { Module } from "./modules";

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
export default class WLayout extends WElement {
    private static leftHtml: HTMLElement;
    private static rightHtml: HTMLElement;
    private static centerHtml: HTMLElement;

    private static slots: WSlot[] = [];

    constructor() {
        super(html, css);
        WLayout.leftHtml = this.html.querySelector("[name='left']") as HTMLElement;
        WLayout.rightHtml = this.html.querySelector("[name='right']") as HTMLElement;
        WLayout.centerHtml = this.html.querySelector("[name='center']") as HTMLElement;
    }

    public static getSlot(name: Module): WSlot | null {
        return WLayout.slots.find(s => s.name === name) ?? null;
    }

    public addSlot(name: Module): WSlot {
        const curr = new WSlot(name);

        WLayout.leftHtml.appendChild(curr.left);
        WLayout.rightHtml.appendChild(curr.right);
        WLayout.centerHtml.appendChild(curr.center);

        WLayout.slots.push(curr);
        return curr;
    }

    public static showSlot(name: Module): void {
        const curr = WLayout.slots.find(s => s.name === name);
        if (!curr) return;

        WLayout.slots.forEach(s => {
            s.hide("left");
            s.hide("center");
            s.hide("right");
        });

        curr?.show("left");
        curr?.show("center");
        curr?.show("right");
    }
}

function html(): string {
    return /*html*/`
    <div class="w-layout">
        <div class="w-layout__left" name="left"></div>
        <div class="w-layout__center" name="center"></div>
        <div class="w-layout__right" name="right"></div>
    </div>
    `
}

function css(): string {
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
