import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import { Global, GlobalEvent } from "../../utils/global";
import WMarkupList from "./markup-list";

export default class MarkupModule
{
    private left: HTMLElement;
    private head: WPanelHead;
    private markupList: WMarkupList;

    constructor(left: HTMLElement)
    {
        this.left = left;
        this.head = new WPanelHead("Markup");

        this.markupList = new WMarkupList();
        this.left.appendChild(this.head.html);
        this.left.appendChild(this.markupList.html);

        Global.listenEvent(GlobalEvent.OnLoggedIn, () => this.showEmptyMarkup("Coming soon..."));
        Global.listenEvent(GlobalEvent.OnLoggedOut, () => this.showEmptyMarkup("Login to see your markup here..."));
    }

    showEmptyMarkup(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.markupList.html.replaceChildren();
        this.markupList.html.appendChild(empty.html);
    }
}
