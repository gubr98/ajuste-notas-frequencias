// FILE: src/controllers/request.controller.ts
import { Request, Response } from "express";
import { DataSource, Repository } from "typeorm";
import config from "../../ormconfig";
import { AdjustmentRequest, RequestStatus } from "../entity/Request";
import { AuditLog } from "../entity/AuditLog";
import { User, Role } from "../entity/User";

let dataSource: DataSource;
async function ensureDataSource() {
  if (!dataSource) {
    dataSource = new DataSource(config);
    await dataSource.initialize();
  }
}

export async function createRequest(req: Request, res: Response) {
  try {
    await ensureDataSource();
    const repo = dataSource.getRepository(AdjustmentRequest);
    const userRepo = dataSource.getRepository(User);

    const { studentEmail, courseCode, discipline, description, evidenceFiles } =
      req.body;
    
    if (!studentEmail || !courseCode || !discipline || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const student = await userRepo.findOne({ where: { email: studentEmail } });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const r = repo.create({
      student,
      courseCode,
      discipline,
      description,
      evidenceFiles: evidenceFiles || "",
    });
    const saved = await repo.save(r);

    const auditRepo = dataSource.getRepository(AuditLog);
    await auditRepo.save({
      entity: "AdjustmentRequest",
      entityId: saved.id,
      action: "create",
      payload: JSON.stringify({ createdBy: student.email }),
      performedBy: student.email,
    });

    return res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating request:", error);
    return res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : String(error) });
  }
}

export async function listRequests(req: Request, res: Response) {
  await ensureDataSource();
  const { studentId, status } = req.query;
  const repo = dataSource.getRepository(AdjustmentRequest);

  const filters: any = {};
  if (studentId) filters.student = { id: studentId };
  if (status) filters.status = status;

  const requests = await repo.find({ where: filters, relations: ["student"] });
  res.json(requests);
}

export async function getRequest(req: Request, res: Response) {
  await ensureDataSource();
  const { id } = req.params;
  const repo = dataSource.getRepository(AdjustmentRequest);

  const request = await repo.findOne({ where: { id }, relations: ["student"] });
  if (!request) return res.status(404).json({ message: "Request not found" });

  res.json(request);
}

export async function updateStatus(req: Request, res: Response) {
  await ensureDataSource();
  const { id } = req.params;
  const { status, decisionNote } = req.body;

  if (!Object.values(RequestStatus).includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const repo = dataSource.getRepository(AdjustmentRequest);
  const request = await repo.findOne({ where: { id }, relations: ["student"] });
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = status;
  if (decisionNote) request.decisionNote = decisionNote;

  await repo.save(request);

  res.json({ message: "Status updated", request });
}

export async function getRequestHistory(req: Request, res: Response) {
  await ensureDataSource();
  const { studentId } = req.params;
  const repo = dataSource.getRepository(AdjustmentRequest);

  const history = await repo.find({
    where: { student: { id: studentId } },
    order: { createdAt: "DESC" },
    relations: ["student"],
  });

  res.json(history);
}
