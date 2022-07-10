import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;
}