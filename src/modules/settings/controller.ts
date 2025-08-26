import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import { Global, GlobalEvent } from "../../utils/global";
import WSettingsList from "./settings-list";

export default class SettingsModule
{
    private left: HTMLElement;
    private head: WPanelHead;
    private markupList: WSettingsList;

    constructor(left: HTMLElement)
    {
        this.left = left;
        this.head = new WPanelHead("Settings");

        this.markupList = new WSettingsList();
        this.left.appendChild(this.head.html);
        this.left.appendChild(this.markupList.html);

        Global.listenEvent(GlobalEvent.OnLoggedIn, () => this.showEmptyMarkup("Coming soon..."));
        Global.listenEvent(GlobalEvent.OnLoggedOut, () => this.showEmptyMarkup("Login to see your settings here..."));
    }

    showEmptyMarkup(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.markupList.html.replaceChildren();
        this.markupList.html.appendChild(empty.html);
    }
}
