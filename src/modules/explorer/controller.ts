import WModule from "../../core/module";
import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WExplorerList from "./explorer-list";

export default class ExplorerModule extends WModule
{
    private head: WPanelHead;
    private markupList: WExplorerList;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
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
