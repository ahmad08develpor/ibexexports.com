import { Router, type IRouter } from "express";
import jwt from "jsonwebtoken";
import { db, contentBlocksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const JWT_SECRET = process.env.SESSION_SECRET ?? "fallback-secret";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

function verifyToken(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

router.put("/admin/content/:section", async (req, res): Promise<void> => {
  if (!verifyToken(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const section = Array.isArray(req.params.section) ? req.params.section[0] : req.params.section;
  const { value } = req.body as { value?: string };

  if (value == null || typeof value !== "string") {
    res.status(400).json({ error: "Missing value" });
    return;
  }

  const [existing] = await db.select().from(contentBlocksTable).where(eq(contentBlocksTable.section, section));

  let block;
  if (existing) {
    [block] = await db
      .update(contentBlocksTable)
      .set({ value })
      .where(eq(contentBlocksTable.section, section))
      .returning();
  } else {
    [block] = await db
      .insert(contentBlocksTable)
      .values({ section, value })
      .returning();
  }

  res.json(block);
});

export default router;
