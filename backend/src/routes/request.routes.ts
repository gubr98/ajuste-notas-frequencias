import { Router } from "express";
import {
  createRequest,
    listRequests,
    updateStatus,
    getRequestHistory,
    getRequest,
} from "../controllers/request.controller";

export const requestRouter = Router();

requestRouter.post("/", createRequest);
requestRouter.get("/", listRequests);
requestRouter.get("/:id", getRequest);
requestRouter.patch("/:id/status", updateStatus);
requestRouter.get("/:id/history", getRequestHistory);
