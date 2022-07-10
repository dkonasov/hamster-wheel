import { useStore } from "effector-react";
import React, { FC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Task } from "../../entities/task";
import { selectedProject$ } from "../../state/projects";
import { createTaskFx, loadTasksFx, tasks$ } from "../../state/tasks";
import { TaskDialog } from "../dialogs/task/task-dialog";
import { ProjectDetailsSkeleton } from "../skeletons/project-details/projects-skeleton";
import { TasksListElem } from "../tasks-list-element/task-list-element";
import { Button } from "../ui-kit/button/button";
import { Plus } from "../ui-kit/icons/plus";
import styles from "./project-details.module.css";

export const ProjectDetails: FC<{}> = () => {
  const selectedProject = useStore(selectedProject$);
  const pending = useStore(loadTasksFx.pending);
  const projectIsSelected = typeof selectedProject === "number";
  const tasks = useStore(tasks$);
  const [createDialogIsVisible, setCreateDialogIsVisible] = useState(false);

  const showCreateDialog = useCallback(() => {
    setCreateDialogIsVisible(true);
  }, [setCreateDialogIsVisible]);

  const hideCreateDialog = useCallback(() => {
    setCreateDialogIsVisible(false);
  }, [setCreateDialogIsVisible]);

  const handleTaskCreate = useCallback(
    (task: Task) => {
      createTaskFx(task);
      const unwatch = createTaskFx.doneData.watch(() => {
        setCreateDialogIsVisible(false);
        unwatch();
      });
    },
    [setCreateDialogIsVisible]
  );

  return (
    <div className={styles.root}>
      {!projectIsSelected && (
        <div className={styles.noProject}>No project was selected</div>
      )}
      {projectIsSelected && pending && <ProjectDetailsSkeleton />}
      {projectIsSelected && !pending && !tasks.length && (
        <div className={styles.toTasks}>No tasks was found</div>
      )}

      {projectIsSelected && !pending && tasks.length && (
        <div className={styles.list}>
          {tasks.map((task) => (
            <TasksListElem
              key={`${selectedProject}-${task.id}`}
              task={task}
              className={styles.element}
            />
          ))}
        </div>
      )}
      {projectIsSelected && !pending && (
        <Button
          className={styles.floatingButton}
          variant="round"
          onClick={showCreateDialog}
        >
          <Plus />
        </Button>
      )}
      <TaskDialog
        visible={createDialogIsVisible}
        onClose={hideCreateDialog}
        onTaskSave={handleTaskCreate}
      />
    </div>
  );
};
