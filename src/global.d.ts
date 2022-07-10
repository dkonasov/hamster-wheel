import type { Project } from "./entities/project";
import type { Task } from "./entities/task";

declare global {
  var backend: {
    createProject: (project: Project) => Promise<Project>;
    createTask: (task: Task) => Promise<Task>;
    updateTask: (task: Task) => Promise<Task>;
    deleteTask: (id: number) => Promise<void>;
    updateProject: (project: Project) => Promise<Project>;
    deleteProject: (id: number) => Promise<void>;
    listProjects: () => Promise<Project[]>;
    listTasks: (projectId: number) => Promise<Task[]>;
  };
}

export default global;
