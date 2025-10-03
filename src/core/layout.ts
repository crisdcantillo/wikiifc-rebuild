import WElement from "../core/element";
import AuthModule from "../modules/auth/controller";
import CollaborationModule from "../modules/collaboration/controller";
import ExplorerModule from "../modules/explorer/controller";
import FilesModule from "../modules/files/controller";
import SettingsModule from "../modules/settings/controller";
import AuthService from "../services/auth";
import { AuthStorage } from "../storages/auth-storage";
import Assets from "../core/assets";
import { WTabs } from "./tabs";

export enum Module
{
    Auth = "auth",
    Files = "files",
    Explorer = "explorer",
    Collaboration = "collaboration",
    Settings = "settings"
}

export class WLayout extends WElement
{
    private static _instance: WLayout;
    private tabs: WTabs;

    private leftHtml: HTMLElement;
    private centerHtml: HTMLElement;
    private rightHtml: HTMLElement;

    private constructor()
    {
        super(html, css);

        this.tabs = new WTabs();
        this.html.prepend(this.tabs.html);

        this.leftHtml = this.html.querySelector("[name='left']") as HTMLElement;
        this.rightHtml = this.html.querySelector("[name='right']") as HTMLElement;
        this.centerHtml = this.html.querySelector("[name='center']") as HTMLElement;

        this.initModules();
        this.initOptions();
     }

     public static get instance(): WLayout
     {
        if (!WLayout._instance) WLayout._instance = new WLayout();
        return WLayout._instance;
     }

    public showModule(name: Module): void
    {
        this.hideAllModules();

        const left = this.leftHtml.querySelector(`[slot='${name}-left']`);
        const center = this.centerHtml.querySelector(`[slot='${name}-center']`);
        const right = this.rightHtml.querySelector(`[slot='${name}-right']`);

        left?.setAttribute("visible", "");
        center?.setAttribute("visible", "");
        right?.setAttribute("visible", "");

        const moduleTab = this.tabs.getTabByName(name);
        if (moduleTab) this.tabs.setActiveTab(moduleTab);
    }

    private hideAllModules(): void
    {
        const modules = Array.from(this.html.querySelectorAll("[slot]"));
        modules.forEach(module => module.removeAttribute("visible"));
    }

    private initModules(): void
    {
        const authPanels = this.createPanels(Module.Auth);
        const filesPanels = this.createPanels(Module.Files);
        const explorerPanels = this.createPanels(Module.Explorer);
        const collaborationPanels = this.createPanels(Module.Collaboration);
        const settingsPanels = this.createPanels(Module.Settings);

        new AuthModule(authPanels.left, authPanels.center, authPanels.right);
        new FilesModule(filesPanels.left, filesPanels.center, filesPanels.right);
        new ExplorerModule(explorerPanels.left, explorerPanels.center, explorerPanels.right);
        new CollaborationModule(collaborationPanels.left, collaborationPanels.center, collaborationPanels.right);
        new SettingsModule(settingsPanels.left, settingsPanels.center, settingsPanels.right);

        this.tabs.addTab("top", Module.Files, Assets.tabFile, () => this.showModule(Module.Files));
        this.tabs.addTab("top", Module.Explorer, Assets.tabExplorer, () => this.showModule(Module.Explorer));
        this.tabs.addTab("top", Module.Collaboration, Assets.tabCollaboration, () => this.showModule(Module.Collaboration));
        this.tabs.addTab("top", Module.Settings, Assets.tabSettings, () => this.showModule(Module.Settings));
    }

    private initOptions(): void
    {
        const feedback = this.tabs.addTab("bottom", "Feedback", Assets.feedback, () => {});
        const signOut = this.tabs.addTab("bottom", "Sign Out", Assets.logout, () =>
        {
            AuthStorage.instance.signOut();
            AuthService.logout();
        });

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
    }

    private createPanels(name: Module): { left: HTMLElement, center: HTMLElement, right: HTMLElement }
    {
        const left = document.createElement("div");
        const center = document.createElement("div");
        const right = document.createElement("div");

        left.setAttribute("slot", `${name}-left`);
        center.setAttribute("slot", `${name}-center`);
        right.setAttribute("slot", `${name}-right`);

        this.leftHtml.appendChild(left);
        this.centerHtml.appendChild(center);
        this.rightHtml.appendChild(right);

        return { left, center, right }
    }
}

function html(): string
{
    return /*html*/`
    <div class="w-tabbed-layout">
        <div class="w-tabbed-layout__left" name="left"></div>
        <div class="w-tabbed-layout__center" name="center"></div>
        <div class="w-tabbed-layout__right" name="right"></div>
    </div>
    `
}

function css(): string
{
    return /*css*/`
    .w-tabbed-layout
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .w-tabbed-layout__left
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .w-tabbed-layout__center
    {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-left: 1px solid rgba(var(--color-white), 0.2);
        border-right: 1px solid rgba(var(--color-white), 0.2);
        position: relative;
    }

    .w-tabbed-layout__right
    {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* Slots */
    [slot]
    {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        display: none; /* Hidden by default */
        overflow: auto;
    }

    [slot][visible]
    {
        display: flex;
    }
    `
}
