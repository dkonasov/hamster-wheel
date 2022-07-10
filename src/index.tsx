import { app, BrowserWindow, protocol, ipcMain } from "electron";
import { JSDOM } from "jsdom";
import { join, normalize } from "path";
import React from "react";
import Renderer from "react-dom/server";
import { App } from "./components/app";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { Project } from "./entities/project";
import { DataSourceSingletonFactory } from "./singletons/data-source-singleton-factory";
import { Task } from "./entities/task";

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });
  const dom = await JSDOM.fromFile(join(__dirname, "../index.html"));
  dom.window.document.body.innerHTML = Renderer.renderToString(<App />);
  win.loadURL(`data:text/html;charset=utf-8,${dom.serialize()}`, {
    baseURLForDataURL: "el://" + __dirname,
  });
};

app.whenReady().then(() => {
  // const appDataPath = join(app.getPath('appData'), app.getName());
  DataSourceSingletonFactory.createInstance({
    type: "sqlite",
    synchronize: true,
    database: join(app.getPath("appData"), app.getName(), "db.sqlite"),
    entities: [Project, Task],
  });

  ipcMain.handle("project:create", async (_, project: Project) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Project)
      .save(project);
  });

  ipcMain.handle("task:create", async (_, task: Task) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Task)
      .save(task);
  });

  ipcMain.handle("task:update", async (_, task: Task) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Task)
      .save(task);
  });

  ipcMain.handle("task:delete", async (_, id: number) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Task)
      .delete({ id });
  });

  ipcMain.handle("project:update", async (_, project: Project) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Project)
      .save(project);
  });

  ipcMain.handle("project:getList", async (_) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Project)
      .find();
  });

  ipcMain.handle("task:getList", async (_, projectId: number) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Task)
      .find({ where: { projectId } });
  });

  ipcMain.handle("project:delete", async (_, id: number) => {
    return await DataSourceSingletonFactory.getInstance()
      .getRepository(Project)
      .delete({ id });
  });

  protocol.registerFileProtocol("el", (request, callback) => {
    callback({
      path: normalize(
        decodeURIComponent(
          request.url
            .substr(3)
            .replace(__dirname.replace("/dist", ""), __dirname)
        )
      ),
    });
  });
  createWindow();
});
