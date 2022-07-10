import React, { FC } from "react";
import styles from "./projects-skeleton.module.css";
import cx from "classnames";

export const ProjectsSkeleton: FC = () => (
    <div>
        <div className={cx(styles.bar, "skeleton-bar")}></div>
    </div>
);