
require("dotenv").config();

const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const isAiven = process.env.DB_HOST?.includes("aivencloud.com");

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "worldwide_constructions",
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

if (isAiven) {
  const caPath = path.join(__dirname, "..", "ca.pem");

  dbConfig.ssl = {
    ca: fs.readFileSync(caPath, "utf8"),
    rejectUnauthorized: true,
  };
}

const db = mysql.createPool(dbConfig);

// Verify the connection and release it back to the pool.
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL database connected successfully!");
  connection.release();
});

module.exports = db;