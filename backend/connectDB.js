import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "huycool2311",
  database: "voiceapp",
});
export default db;
