  require('dotenv').config();
const { Pool } = require("pg");

const postgres = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

function getPoolHealth() {
  return {
    totalCount: postgres.totalCount,
    idleCount: postgres.idleCount,
    waitingCount: postgres.waitingCount,
  };
}

process.on("SIGINT", async () => {
  console.log("Fechando pool de conexões...");
  await postgres.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Fechando pool de conexões...");
  await postgres.end();
  process.exit(0);
});

module.exports = { postgres, getPoolHealth };