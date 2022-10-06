import React, { MouseEvent, useState } from "react";
import { useCallback } from "react";
import { FC } from "react";
import { Project } from "../../entities/project";
import {
  deleteProject,
  selectedProject$,
  updateProject,
} from "../../state/projects";
import { ConfirmDialog } from "../dialogs/confirm/confirm-dialog";
import { ProjectsDialog } from "../dialogs/projects/projects-dialog";
import { Button } from "../ui-kit/button/button";
import { Delete } from "../ui-kit/icons/delete";
import { Edit } from "../ui-kit/icons/edit";
import styles from "./projects-list.module.css";
import cx from "classnames";
import { useStore } from "effector-react";
import { HTMLAttributes } from "react";

export interface ProjectsListElemProps extends HTMLAttributes<HTMLDivElement> {
  project: Project;
}

export const ProjectsListElem: FC<ProjectsListElemProps> = (props) => {
  const { project, ...restProps } = props;
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const selectedProject = useStore(selectedProject$);

  const [editVisible, setEditVisible] = useState(false);

  const handleDeletionTrigger = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setDeleteConfirmVisible(true);
    },
    [setDeleteConfirmVisible]
  );

  const handleEditTrigger = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setEditVisible(true);
    },
    [setEditVisible]
  );

  const handleEditClose = useCallback(() => {
    setEditVisible(false);
  }, [setEditVisible]);

  const handleConfirmClose = useCallback(() => {
    setDeleteConfirmVisible(false);
  }, [setDeleteConfirmVisible]);

  const handleDeletion = useCallback(() => {
    deleteProject(project.id);
  }, [project.id]);

  const handleEdit = useCallback(
    (project: Project) => {
      updateProject(project);
      const unwatch = updateProject.doneData.watch(() => {
        setEditVisible(false);
        unwatch();
      });
    },
    [setEditVisible]
  );

  return (
    <>
      <div
        className={cx(styles.root, {
          [styles.selected]: selectedProject === project.id,
        })}
        tabIndex={0}
        {...restProps}
      >
        <div className={styles.title}>{project.name}</div>
        {project.description && (
          <div className={styles.description}>{project.description}</div>
        )}
        <Button
          variant="clear"
          className={styles.edit}
          onClick={handleEditTrigger}
        >
          <Edit size={24} />
        </Button>
        <Button
          variant="clear"
          className={styles.delete}
          onClick={handleDeletionTrigger}
        >
          <Delete size={24} />
        </Button>
      </div>
      <ConfirmDialog
        title="Delete project"
        text={`Are you sure want to delete project "${project.name}"? This action is undoable!`}
        visible={deleteConfirmVisible}
        onClose={handleConfirmClose}
        onConfirm={handleDeletion}
      />
      <ProjectsDialog
        visible={editVisible}
        project={project}
        onClose={handleEditClose}
        onProjectSave={handleEdit}
      />
    </>
  );
};
