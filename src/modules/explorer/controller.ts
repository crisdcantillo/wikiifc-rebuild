import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WExplorerList from "./explorer-list";

export default class ExplorerModule
{
    private left: HTMLElement;
    private head: WPanelHead;
    private markupList: WExplorerList;

    constructor(left: HTMLElement)
    {
        this.left = left;
        this.head = new WPanelHead("Explorer");

        this.markupList = new WExplorerList();
        this.left.appendChild(this.head.html);
        this.left.appendChild(this.markupList.html);
    }

    showEmptyMarkup(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.markupList.html.replaceChildren();
        this.markupList.html.appendChild(empty.html);
    }
}
