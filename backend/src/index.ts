import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { DataSource } from "typeorm";
import config from "../ormconfig";
import { requestRouter } from "./routes/request.routes";

async function main() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  const dataSource = new DataSource(config);
  await dataSource.initialize();
  console.log("DataSource initialized");

  app.use("/api/requests", requestRouter);

  app.get("/health", (req, res) => res.json({ ok: true }));

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
