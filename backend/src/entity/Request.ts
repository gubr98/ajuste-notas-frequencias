import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum RequestStatus {
  PENDING = "pending",
  IN_REVIEW = "in_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  VALIDATED = "validated",
}

@Entity()
export class AdjustmentRequest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "studentId" })
  student!: User;

  @Column()
  courseCode!: string;

  @Column()
  discipline!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text", nullable: false })
  evidenceFiles!: string;

  @Column({
    type: "simple-enum",
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status!: RequestStatus;

  @Column({ type: "text", nullable: true })
  decisionNote?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
