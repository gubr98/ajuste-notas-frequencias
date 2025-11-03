import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../../ormconfig";
import { User, Role } from "../entity/User";
import { AdjustmentRequest, RequestStatus } from "../entity/Request";
import { AuditLog } from "../entity/AuditLog";

async function seed() {
  const ds = new DataSource(config);
  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const reqRepo = ds.getRepository(AdjustmentRequest);
  const auditRepo = ds.getRepository(AuditLog);

  await ds
    .getRepository(AdjustmentRequest)
    .createQueryBuilder()
    .delete()
    .execute();

  await ds.getRepository(AuditLog).createQueryBuilder().delete().execute();

  await ds.getRepository(User).createQueryBuilder().delete().execute();

  const student = userRepo.create({
    email: "aluno1@uni.edu",
    name: "Aluno Um",
    role: Role.STUDENT,
  });
  const teacher = userRepo.create({
    email: "prof1@uni.edu",
    name: "Prof. Dois",
    role: Role.TEACHER,
  });
  const secretary = userRepo.create({
    email: "secret@uni.edu",
    name: "Secretaria",
    role: Role.SECRETARY,
  });
  const admin = userRepo.create({
    email: "admin@uni.edu",
    name: "Admin",
    role: Role.ADMIN,
  });

  await userRepo.save([student, teacher, secretary, admin]);

  const r1 = reqRepo.create({
    student,
    courseCode: "ENG101",
    discipline: "Cálculo I",
    description: "Nota da P1 parece incorreta",
    evidenceFiles: "evidence1.pdf,evidence2.pdf",
    status: RequestStatus.PENDING,
  });
  await reqRepo.save(r1);

  await auditRepo.save({
    entity: "AdjustmentRequest",
    entityId: r1.id,
    action: "seed:create",
    payload: JSON.stringify({ createdBy: student.email }),
    performedBy: student.email,
  });

  console.log("Seed completed");
  await ds.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
