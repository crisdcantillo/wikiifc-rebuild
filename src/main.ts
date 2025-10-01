import Assets from "./utils/assets";
import { Module, WLayout } from "./core/layout";
import { WTabs, Tab } from "./core/tabs";
import AuthModule from "./modules/auth/controller";
import FilesModule from "./modules/files/controller";
import ExplorerModule from "./modules/explorer/controller";
import CollaborationModule from "./modules/collaboration/controller";
import SettingsModule from "./modules/settings/controller";
import AuthService from "./services/auth";
import { AuthStorage } from "./storages/auth-storage";

// Layout
const layout = new WLayout();

const authPanels = layout.createPanels(Module.Auth);
new AuthModule(authPanels.left, authPanels.center, authPanels.right);

const filesPanels = layout.createPanels(Module.Files);
new FilesModule(filesPanels.left, filesPanels.center, filesPanels.right);

const explorerPanels = layout.createPanels(Module.Explorer);
new ExplorerModule(explorerPanels.left, explorerPanels.center, explorerPanels.right);

const collaborationPanels = layout.createPanels(Module.Collaboration);
new CollaborationModule(collaborationPanels.left, collaborationPanels.center, collaborationPanels.right);

const settingsPanels = layout.createPanels(Module.Settings);
new SettingsModule(settingsPanels.left, settingsPanels.center, settingsPanels.right);

// Tabs
const tabs = new WTabs();

tabs.addTab("top", Tab.Files, Assets.tabFile, () => layout.showModule(Module.Files));
tabs.addTab("top", Tab.Explorer, Assets.tabExplorer, () => layout.showModule(Module.Explorer));
tabs.addTab("top", Tab.Collaboration, Assets.tabCollaboration, () => layout.showModule(Module.Collaboration));
tabs.addTab("top", Tab.Settings, Assets.tabSettings, () => layout.showModule(Module.Settings));

const feedback = tabs.addTab("bottom", Tab.Feedback, Assets.feedback, () => {});
const signOut = tabs.addTab("bottom", Tab.Logout, Assets.logout, () =>
{
    AuthStorage.instance.signOut();
    AuthService.logout();
});

// Init app
const app = document.querySelector("#app") as HTMLElement;
app.appendChild(tabs.html);
app.appendChild(layout.html);

layout.showModule(Module.Files); // init auth module when app is loaded

// Events
AuthStorage.instance.subscribe((state) =>
{
    switch (state.status)
    {
        case "SignIn":
            feedback.disabled = false;
            signOut.disabled = false;
            break;
        case "SignOut":
            feedback.disabled = true;
            signOut.disabled = true;
            break;
    }
});
