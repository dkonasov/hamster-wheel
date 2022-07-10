import React, { FC, FormEvent, useCallback } from "react";
import { Project } from "../../../entities/project";
import { getFormValues } from "../../../utils/get-form-values";
import { Button } from "../../ui-kit/button/button";
import { Modal, ModalProps } from "../../ui-kit/modal/modal";
import styles from "./projects-dialog.module.css";

export type ProjectsDialogProps = Omit<ModalProps, "title"> & {
  project?: Project;
  onProjectSave?: (project: Project) => void;
};

export const ProjectsDialog: FC<ProjectsDialogProps> = (props) => {
  const { project = new Project(), onProjectSave, ...modalProps } = props;
  const title =
    typeof project.id === "number" ? project.name : "Create new project";
  const onFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const formValues = getFormValues(
        event.nativeEvent.target as HTMLFormElement
      );
      project.name = formValues["name"];
      project.description = formValues["description"];
      onProjectSave?.(project);
    },
    [project, onProjectSave]
  );

  return (
    <Modal {...modalProps} title={title}>
      <form className={styles.projectForm} onSubmit={onFormSubmit}>
        <div className={styles.projectField}>
          <label htmlFor="name">Name</label>
          <input name="name" defaultValue={project.name} />
        </div>
        <div className={styles.projectField}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={project.description}
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
