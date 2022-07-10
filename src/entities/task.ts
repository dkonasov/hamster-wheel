import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  completed: boolean;

  @Column()
  projectId: number;
}
