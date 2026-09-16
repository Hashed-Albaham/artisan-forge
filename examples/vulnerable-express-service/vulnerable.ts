// ❌ VULNERABLE CODE (Typical AI-Generated Slop)
import express from "express";

const app = express();
const JWT_SECRET = "super_secret_hardcoded_jwt_key_123456";

// Vulnerability 1: SQL Injection
app.get("/api/users", async (req, res) => {
  const { role } = req.query;
  // Raw string interpolation allows attacker to inject `' OR '1'='1`
  const users = await db.query(`SELECT * FROM users WHERE role = '${role}'`);
  
  // Vulnerability 2: N+1 loop
  for (const user of users.rows) {
    const orders = await db.query(`SELECT * FROM orders WHERE user_id = ${user.id}`);
    user.orders = orders.rows;
  }

  // Vulnerability 3: Empty catch / swallowed error
  try {
    await sendAuditLog("Viewed users");
  } catch (e) {
    // Slop: swallowed error
  }

  res.json(users.rows);
});
