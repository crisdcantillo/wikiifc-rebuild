import { Module, WLayout } from "./core/layout";

// Init app
const app = document.querySelector("#app") as HTMLElement;
app.appendChild(WLayout.instance.html);

WLayout.instance.showModule(Module.Files); // init auth module when app is loaded
