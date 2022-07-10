import React, { FC, FormEvent, useCallback } from "react";
import { Task } from "../../../entities/task";
import { getFormValues } from "../../../utils/get-form-values";
import { Button } from "../../ui-kit/button/button";
import { Modal, ModalProps } from "../../ui-kit/modal/modal";
import styles from "./task-dialog.module.css";

export type TaskDialogProps = Omit<ModalProps, "title"> & {
  task?: Task;
  onTaskSave?: (project: Task) => void;
};

export const TaskDialog: FC<TaskDialogProps> = (props) => {
  const { task = new Task(), onTaskSave, ...modalProps } = props;
  const title = task.name ? task.name : "New task";

  const onFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const formValues = getFormValues(
        event.nativeEvent.target as HTMLFormElement
      );
      task.name = formValues["name"];
      task.description = formValues["description"];
      onTaskSave?.(task);
    },
    [task, onTaskSave]
  );

  return (
    <Modal {...modalProps} title={title}>
      <form className={styles.taskForm} onSubmit={onFormSubmit}>
        <div className={styles.taskField}>
          <label htmlFor="name">Name</label>
          <input name="name" defaultValue={task.name} />
        </div>
        <div className={styles.taskField}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={task.description}
          ></textarea>
        </div>
        <div className={styles.buttonsRow}>
          <Button type="submit">Save</Button>
          <Button
            variant="secondary"
            onClick={modalProps.onClose}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
