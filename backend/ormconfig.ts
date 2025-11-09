// FILE: ormconfig.ts
import { DataSourceOptions } from "typeorm";

// Use SQLite if MySQL is not available, otherwise use MySQL
const useSQLite = !process.env.DB_HOST || process.env.DB_TYPE === "sqlite";

const config: DataSourceOptions = useSQLite
  ? {
      type: "sqlite",
      database: "database/academic.db",
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
    }
  : {
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
    };

export default config;
