import mariadb from "mariadb";
import { fileLogger } from "@/loggers/logger";

let port: number = 3306;
if (process.env.DB_PORT) {
  port = parseInt(process.env.DB_PORT);
}

// debugLen defined the longest number of bytes of a single message. SQL can be long, so allow a lot of length
export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port,
  connectionLimit: 5,
  debugLen: 4096,
  logger: {
    query: (msg) => {
      fileLogger.info(msg);
    },
  },
});

export type UpdateResult = {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
};
