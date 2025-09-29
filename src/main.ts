import WTabs from "./shared/tabs";
import WTabItem from "./shared/tab-item";
import Assets from "./utils/assets";
import WLayout from "./core/layout";
import FilesModule from "./modules/files/controller";
import AuthModule from "./modules/auth/controller";
import CollaborationModule from "./modules/collaboration/controller";
import SettingsModule from "./modules/settings/controller";
import AuthService from "./services/auth";
import ExplorerModule from "./modules/explorer/controller";
import { Module } from "./core/modules";

// Layout
const layout = new WLayout();

layout.addSlot(Module.Auth);
layout.addSlot(Module.Files);
layout.addSlot(Module.Explorer);
layout.addSlot(Module.Collaboration);
layout.addSlot(Module.Settings);

// Modules init
const authSlot = WLayout.getSlot(Module.Auth);
new AuthModule(authSlot!.center, authSlot!.right);

const filesSlot = WLayout.getSlot(Module.Files);
new FilesModule(filesSlot!.left, filesSlot!.right);

const explorerSlot = WLayout.getSlot(Module.Explorer);
new ExplorerModule(explorerSlot!.left);

const collaborationSlot = WLayout.getSlot(Module.Collaboration);
new CollaborationModule(collaborationSlot!.left, collaborationSlot!.right);

const settingsSlot = WLayout.getSlot(Module.Settings);
new SettingsModule(settingsSlot!.left);

// Tabs
const tabs = new WTabs();

const tabFiles = new WTabItem(Assets.tabFile, "Files");
const tabExplorer = new WTabItem(Assets.tabMarkup, "Explorer");
const tabCollaboration = new WTabItem(Assets.tabCollaboration, "Collaboration");
const tabSettings = new WTabItem(Assets.tabSettings, "Settings");
const tabFeedback = new WTabItem(Assets.feedback, "Feedback");
const tabLogout = new WTabItem(Assets.logout, "Logout");

tabs.addTabs("top", [tabFiles, tabExplorer, tabCollaboration, tabSettings]);
tabs.addTabs("bottom", [tabFeedback, tabLogout]);

// Tab listeners
tabFiles.onClick = () => WLayout.showSlot(Module.Files);
tabExplorer.onClick = () => WLayout.showSlot(Module.Explorer);
tabCollaboration.onClick = () => WLayout.showSlot(Module.Collaboration);
tabSettings.onClick = () => WLayout.showSlot(Module.Settings);
tabLogout.onClick = () => AuthService.logout();

// Init layout
const app = document.querySelector("#app") as HTMLElement;
app.appendChild(tabs.html);
app.appendChild(layout.html);
