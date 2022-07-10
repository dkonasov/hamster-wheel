import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./components/app";
import { loadProjectsFx } from "./state/projects";

window.addEventListener("load", (_) => {
  hydrateRoot(document.body, <App />);
  loadProjectsFx();
});
