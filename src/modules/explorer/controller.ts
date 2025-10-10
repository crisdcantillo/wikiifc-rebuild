import WModule from "../../core/module";
import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WExplorerList from "./explorer-list";

export default class ExplorerModule extends WModule
{
    private head: WPanelHead;
    private explorerList: WExplorerList;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.head = new WPanelHead("Explorer");

        this.explorerList = new WExplorerList();
        this.left.appendChild(this.head.html);
        this.left.appendChild(this.explorerList.html);
    }

    showEmptyMarkup(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.explorerList.html.replaceChildren();
        this.explorerList.html.appendChild(empty.html);
    }
}
