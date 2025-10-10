import WModule from "../../core/module";
import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WSettingsList from "./settings-list";

export default class SettingsModule extends WModule
{
    private head: WPanelHead;
    private settingList: WSettingsList;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.head = new WPanelHead("Settings");

        this.settingList = new WSettingsList();
        this.left.appendChild(this.head.html);
        this.left.appendChild(this.settingList.html);
    }

    showEmptyMarkup(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.settingList.html.replaceChildren();
        this.settingList.html.appendChild(empty.html);
    }
}
