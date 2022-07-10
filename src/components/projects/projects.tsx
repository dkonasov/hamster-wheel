import React, { FC, useCallback, useState, FormEvent } from "react";
import { useStore } from "effector-react";
import { createProject, projects$, selectProject } from "../../state/projects";
import { ProjectsSkeleton } from "../skeletons//projects/projects-skeleton";
import styles from "./projects.module.css";
import { Button } from "../ui-kit/button/button";
import { Plus } from "../ui-kit/icons/plus";
import { ProjectsListElem } from "../projects-list-elem/projects-list-elem";
import { ProjectsDialog } from "../dialogs/projects/projects-dialog";
import { Project } from "../../entities/project";

export const Projects: FC = () => {
  const projects = useStore(projects$);
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const openProjectModal = useCallback(() => {
    setProjectModalVisible(true);
  }, [setProjectModalVisible]);

  const closeProjectModal = useCallback(() => {
    setProjectModalVisible(false);
  }, [setProjectModalVisible]);

  const handleProjectCreate = useCallback(
    (project: Project) => {
      createProject(project);
      const unwatch = createProject.doneData.watch(() => {
        setProjectModalVisible(false);
        unwatch();
      });
    },
    [setProjectModalVisible]
  );

  return (
    <div className={styles.root}>
      {!projects && <ProjectsSkeleton />}
      {projects?.length === 0 && <div>No projects was found</div>}
      {projects?.length > 0 && (
        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectsListElem
              key={project.id}
              project={project}
              onClick={() => selectProject(project.id)}
            />
          ))}
        </div>
      )}
      {projects && (
        <Button
          className={styles.floatingButton}
          onClick={openProjectModal}
          variant="round"
        >
          <Plus />
        </Button>
      )}
      <ProjectsDialog
        visible={projectModalVisible}
        onProjectSave={handleProjectCreate}
        onClose={closeProjectModal}
      />
    </div>
  );
};
