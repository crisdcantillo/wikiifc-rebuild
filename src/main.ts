import WTabs from "./shared/tabs";
import WTabItem from "./shared/tab-item";
import Assets from "./utils/assets";
import WLayout from "./core/layout";
import FilesModule from "./modules/files/controller";
import AuthModule from "./modules/auth/controller";
import { Global, GlobalEvent } from "./utils/global";
import UToken from "./utils/token";
import CollaborationModule from "./modules/collaboration/controller";
import AuthService from "./modules/auth/services";
import MarkupModule from "./modules/markup/controller";
import SettingsModule from "./modules/settings/controller";

const app = document.querySelector("#app") as HTMLElement;

// Layout
const layout = new WLayout();

layout.addSlot("auth");
layout.addSlot("files");
layout.addSlot("markup");
layout.addSlot("collaboration");
layout.addSlot("settings");

// Tabs
const tabs = new WTabs();

const tabFiles = new WTabItem(Assets.tabFile, "Files");
const tabExplorer = new WTabItem(Assets.tabMarkup, "Explorer");
const tabCollaboration = new WTabItem(Assets.tabCollaboration, "Collaboration");
const tabSettings = new WTabItem(Assets.tabSettings, "Settings");
const tabFeedback = new WTabItem(Assets.feedback, "Feedback");
const tabLogout = new WTabItem(Assets.logout, "Logout");

tabs.addTabs("center", [tabFiles, tabExplorer, tabCollaboration, tabSettings]);
tabs.addTabs("bottom", [tabFeedback, tabLogout]);

app.appendChild(tabs.html);
app.appendChild(layout.html);

// Tab listeners
tabFiles.onClick = () => WLayout.showSideSlots("files");
tabCollaboration.onClick = () => WLayout.showSideSlots("collaboration");
tabExplorer.onClick = () => WLayout.showSideSlots("markup");
tabSettings.onClick = () => WLayout.showSideSlots("settings");
tabLogout.onClick = () => AuthService.logout();

// Modules init
const authSlot = WLayout.getSlot("auth");
new AuthModule(authSlot!.center, authSlot!.right);

const filesSlot = WLayout.getSlot("files");
new FilesModule(filesSlot!.left, filesSlot!.right);

const markupSlot = WLayout.getSlot("markup");
new MarkupModule(markupSlot!.left);

const collaborationSlot = WLayout.getSlot("collaboration");
new CollaborationModule(collaborationSlot!.left, collaborationSlot!.right);

const settingsSlot = WLayout.getSlot("settings");
new SettingsModule(settingsSlot!.left);

// Global listeners
Global.listenEvent(GlobalEvent.OnLoggedIn, () => loggedIn())
Global.listenEvent(GlobalEvent.OnLoggedOut, () => loggedOut())

// Init files or auth based on authentication
if (UToken.token) Global.dispatchEvent(GlobalEvent.OnLoggedIn);
else Global.dispatchEvent(GlobalEvent.OnLoggedOut);

function loggedIn(): void
{
    tabs.setActiveTab(tabFiles);
    WLayout.showAllSlots("files");

    tabSettings.disable(false);
    tabFeedback.disable(false);
    tabLogout.disable(false);
}

function loggedOut(): void
{
    tabs.setActiveTab(tabFiles)
    WLayout.showSlot("left", "files");
    WLayout.showSlot("center", "auth");
    WLayout.showSlot("right", "auth");

    tabSettings.disable(true);
    tabFeedback.disable(true);
    tabLogout.disable(true);
}
