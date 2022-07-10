import { createEffect, createEvent, createStore, restore } from "effector";
import { Project } from "../entities/project";

export const loadProjectsFx = createEffect(async () => {
  return await backend.listProjects();
});

export const createProject = createEffect((project: Project) => {
  return backend.createProject(project);
});

export const updateProject = createEffect((project: Project) => {
  return backend.updateProject(project);
});

export const deleteProject = createEffect(async (id: number) => {
  await backend.deleteProject(id);
  return id;
});

export const selectProject = createEvent<number>();

export const projects$ = restore(loadProjectsFx, null)
  .on(createProject.doneData, (projects, project) => projects.concat(project))
  .on(deleteProject.doneData, (projects, id) =>
    projects.filter((project) => project.id !== id)
  )
  .on(updateProject.doneData, (projects, updatedProject) =>
    projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    )
  );

export const selectedProject$ = createStore<number | null>(null).on(
  selectProject,
  (_, id) => id
);
