import WTabs from "./shared/tabs";
import WTabItem from "./shared/tab-item";
import Assets from "./utils/assets";
import WLayout from "./core/layout";
import FilesModule from "./modules/files/controller";
import AuthModule from "./modules/auth/controller";
import { Global, GlobalEvent } from "./utils/global";
import UToken from "./utils/token";

const app = document.querySelector("#app") as HTMLElement;
const tabs = new WTabs();

// Layout
const layout = new WLayout();

layout.addSlot("auth");
layout.addSlot("files");
layout.addSlot("explorer");
layout.addSlot("collaboration");
layout.addSlot("settings");

// Tabs
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

// Modules
const authSlot = WLayout.getSlot("auth");
new AuthModule(authSlot!.center, authSlot!.right);

const filesSlot = WLayout.getSlot("files");
const filesController = new FilesModule(filesSlot!.left, filesSlot!.right);

// Tab listeners
tabFiles.onClick = () => WLayout.showSideSlots("files");
tabCollaboration.onClick = () => WLayout.showSideSlots("collaboration");
tabExplorer.onClick = () => WLayout.showSideSlots("explorer");
tabSettings.onClick = () => WLayout.showSideSlots("settings");
tabLogout.onClick = () => UToken.deleteToken();

// Init files or auth based on authentication
if (UToken.token) loggedIn();
else loggedOut();

// Global listeners
Global.listenEvent(GlobalEvent.OnLoggedIn, () => loggedIn())
Global.listenEvent(GlobalEvent.OnLoggedOut, () => loggedOut())

function loggedIn(): void
{
    tabFiles.setActive(true);
    WLayout.showAllSlots("files");
    filesController.showFiles();

    tabSettings.disable(false);
    tabFeedback.disable(false);
    tabLogout.disable(false);
}

function loggedOut(): void
{
    tabFiles.setActive(true);
    WLayout.showSlot("center", "auth");
    WLayout.showSlot("right", "auth");
    filesController.showEmptyFiles("Login to see your files...");

    tabSettings.disable(true);
    tabFeedback.disable(true);
    tabLogout.disable(true);
}
