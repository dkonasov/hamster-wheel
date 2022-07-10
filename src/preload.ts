import { contextBridge, ipcRenderer } from "electron";
import { Task } from "./entities/task";
import { Project } from "./types/project";

contextBridge.exposeInMainWorld("backend", {
  createProject: (project: Project) =>
    ipcRenderer.invoke("project:create", project),
  createTask: (task: Task) => ipcRenderer.invoke("task:create", task),
  updateTask: (task: Task) => ipcRenderer.invoke("task:update", task),
  deleteTask: (id: number) => ipcRenderer.invoke("task:delete", id),
  updateProject: (project: Project) =>
    ipcRenderer.invoke("project:update", project),
  deleteProject: (id: number) => ipcRenderer.invoke("project:delete", id),
  listProjects: () => ipcRenderer.invoke("project:getList"),
  listTasks: (projectId: number) =>
    ipcRenderer.invoke("task:getList", projectId),
});
