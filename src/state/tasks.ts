import { attach, createEffect, createStore, sample } from "effector";
import { Task } from "../entities/task";
import { selectedProject$ } from "./projects";

function substituteTask(tasksList: Task[], task: Task) {
  const taskIndex = tasksList.findIndex((val) => val.id === task.id);
  tasksList[taskIndex] = task;
  return tasksList.slice();
}

function sortTasks(a: Task, b: Task): number {
  if (a.completed > b.completed) {
    return 1;
  } else if (a.completed < b.completed) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  } else {
    return 0;
  }
}

export const loadTasksFx = createEffect(async (id: number) => {
  return await backend.listTasks(id);
});

export const createTaskFx = attach({
  effect: createEffect((task: Task) => backend.createTask(task)),
  source: selectedProject$,
  mapParams: (task: Task, selectedProjectId: number) => {
    task.projectId = selectedProjectId;
    task.completed = false;
    return task;
  },
});

export const completeTaskFx = createEffect(async (task: Task) => {
  task.completed = true;
  return await backend.updateTask(task);
});

export const updateTaskFx = createEffect(
  async (task: Task) => await backend.updateTask(task)
);

export const uncompleteTaskFx = createEffect(async (task: Task) => {
  task.completed = false;
  return await backend.updateTask(task);
});

export const deleteTaskFx = createEffect(async (id: number) => {
  await backend.deleteTask(id);
  return id;
});

sample({
  source: selectedProject$,
  filter: (val) => typeof val === "number",
  target: loadTasksFx,
});

export const tasks$ = createStore<Task[]>(null)
  .on(loadTasksFx.doneData, (_, data) => data.sort(sortTasks))
  .on(createTaskFx.doneData, (tasks, task) =>
    tasks.concat([task]).sort(sortTasks)
  )
  .on(completeTaskFx.doneData, (currentState, task) =>
    substituteTask(currentState, task).sort(sortTasks)
  )
  .on(uncompleteTaskFx.doneData, (currentState, task) =>
    substituteTask(currentState, task).sort(sortTasks)
  )
  .on(deleteTaskFx.doneData, (currentState, id) =>
    currentState.filter((task) => task.id !== id)
  )
  .on(updateTaskFx.doneData, (currentState, task) =>
    substituteTask(currentState, task)
  );
