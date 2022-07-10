import React, { FC, HTMLAttributes, useState } from "react";
import { useCallback } from "react";
import { Task } from "../../entities/task";
import { useMenu } from "../../hooks/use-menu";
import {
  completeTaskFx,
  deleteTaskFx,
  uncompleteTaskFx,
  updateTaskFx,
} from "../../state/tasks";
import { ConfirmDialog } from "../dialogs/confirm/confirm-dialog";
import { Button } from "../ui-kit/button/button";
import { Check } from "../ui-kit/icons/check";
import { Delete } from "../ui-kit/icons/delete";
import { More } from "../ui-kit/icons/more";
import { Undo } from "../ui-kit/icons/undo";
import { Menu } from "../ui-kit/menu/menu.component";
import styles from "./tasks-list-element.module.css";
import cx from "classnames";
import { Edit } from "../ui-kit/icons/edit";
import { TaskDialog } from "../dialogs/task/task-dialog";

export interface TaskListElemProps extends HTMLAttributes<HTMLDivElement> {
  task: Task;
}

export const TasksListElem: FC<TaskListElemProps> = (props) => {
  const { task, className } = props;
  const [menuVisible, setMenuVisible] = useState(false);
  const { triggerProps, menuProps } = useMenu({
    onOpenChange: setMenuVisible,
    open: menuVisible,
  });
  const [deletionConfirmVisible, setDeletionConfirmVisible] = useState(false);
  const [taskDialogVisible, setTaskDialogVisible] = useState(false);

  const showTaskDialog = useCallback(() => {
    setTaskDialogVisible(true);
    setMenuVisible(false);
  }, [setTaskDialogVisible, setMenuVisible]);

  const hideTaskDialog = useCallback(() => {
    setTaskDialogVisible(false);
  }, [setTaskDialogVisible]);

  const saveTask = useCallback(
    (task: Task) => {
      updateTaskFx(task);
      setTaskDialogVisible(false);
    },
    [setTaskDialogVisible]
  );

  const showDeletionConfirm = useCallback(() => {
    setDeletionConfirmVisible(true);
    setMenuVisible(false);
  }, [setDeletionConfirmVisible, setMenuVisible]);

  const handleTaskCompletion = useCallback(() => {
    completeTaskFx(task);
    setMenuVisible(false);
  }, [task, setMenuVisible]);

  const handleTaskUncompletion = useCallback(() => {
    uncompleteTaskFx(task);
    setMenuVisible(false);
  }, [task, setMenuVisible]);

  const deleteTask = useCallback(() => {
    deleteTaskFx(task.id);
    setDeletionConfirmVisible(false);
  }, [setDeletionConfirmVisible, task]);

  const hideDeletionConfirm = useCallback(() => {
    setDeletionConfirmVisible(false);
  }, [setDeletionConfirmVisible]);

  return (
    <div
      className={cx(styles.root, className, {
        [styles.completedTask]: task.completed,
      })}
    >
      <div className={styles.title}>{task.name}</div>
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}
      <Button variant="clear" className={styles.action} {...triggerProps}>
        <More size={24} />
      </Button>
      <Menu
        visible={menuVisible}
        items={[
          task.completed
            ? {
                icon: Undo,
                text: "Uncomplete",
                onClick: handleTaskUncompletion,
              }
            : {
                icon: Check,
                text: "Complete",
                onClick: handleTaskCompletion,
              },
          {
            icon: Edit,
            text: "Edit",
            onClick: showTaskDialog,
          },
          {
            icon: Delete,
            text: "Delete",
            onClick: showDeletionConfirm,
          },
        ]}
        {...menuProps}
      />
      <ConfirmDialog
        visible={deletionConfirmVisible}
        title="Confirm task deletion"
        text={`Are you sure want to delete task "${task.name}? This action is undoable!"`}
        onConfirm={deleteTask}
        onClose={hideDeletionConfirm}
      />
      <TaskDialog
        visible={taskDialogVisible}
        task={task}
        onTaskSave={saveTask}
        onClose={hideTaskDialog}
      />
    </div>
  );
};
