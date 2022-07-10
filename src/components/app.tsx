import React, { FC } from "react";
import styles from "./app.module.css";
import { ProjectDetails } from "./project-details/project-details";
import { Projects } from "./projects/projects";

export const App: FC = () => (
  <div className={styles.root}>
    <div className={styles.nav}>
      <Projects />
    </div>
    <div>
      <ProjectDetails />
    </div>
  </div>
);
