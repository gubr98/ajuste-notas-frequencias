import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Role {
  STUDENT = "student",
  TEACHER = "teacher",
  SECRETARY = "secretary",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  passwordHash?: string;

  @Column({ type: "simple-enum", enum: Role, default: Role.STUDENT })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
