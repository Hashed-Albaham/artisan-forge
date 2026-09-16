// ✅ PRODUCTION ARTISAN HARDENED CODE
import express, { Request, Response } from "express";
import { z } from "zod";

const app = express();

// 1. Secrets validated at startup
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("FATAL: Missing JWT_SECRET environment variable.");
}

const UserQuerySchema = z.object({
  role: z.enum(["admin", "member", "guest"]).default("member")
});

interface UserRecord {
  id: number;
  username: string;
  role: string;
  orders?: OrderRecord[];
}

interface OrderRecord {
  id: number;
  user_id: number;
  total: number;
}

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    // 2. Strict input validation
    const { role } = UserQuerySchema.parse(req.query);

    // 3. Parameterized query (SQL injection immunity)
    const usersResult = await db.query<UserRecord>(
      "SELECT id, username, role FROM users WHERE role = $1",
      [role]
    );

    const users = usersResult.rows;
    if (users.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 4. Batch query (Eliminates N+1 cascade)
    const userIds = users.map((u) => u.id);
    const ordersResult = await db.query<OrderRecord>(
      "SELECT id, user_id, total FROM orders WHERE user_id = ANY($1::int[])",
      [userIds]
    );

    const ordersByUser = ordersResult.rows.reduce<Record<number, OrderRecord[]>>((acc, order) => {
      (acc[order.user_id] = acc[order.user_id] || []).push(order);
      return acc;
    }, {});

    const enrichedUsers = users.map((user) => ({
      ...user,
      orders: ordersByUser[user.id] || []
    }));

    return res.json({ success: true, data: enrichedUsers });
  } catch (err: unknown) {
    // 5. Contextual logging & structured failure response
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[UsersEndpointError]", { error: errorMessage, timestamp: new Date().toISOString() });
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});
