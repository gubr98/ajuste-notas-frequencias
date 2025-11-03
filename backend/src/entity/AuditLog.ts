import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  entity!: string;

  @Column()
  entityId!: string;

  @Column()
  action!: string;

  @Column({ type: "text", nullable: true })
  payload?: string;

  @Column()
  performedBy!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
