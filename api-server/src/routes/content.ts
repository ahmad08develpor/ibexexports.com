import { Router, type IRouter } from "express";
import { db, contentBlocksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/content", async (_req, res): Promise<void> => {
  const blocks = await db.select().from(contentBlocksTable);
  res.json(blocks);
});

router.get("/content/:section", async (req, res): Promise<void> => {
  const section = Array.isArray(req.params.section) ? req.params.section[0] : req.params.section;
  const [block] = await db.select().from(contentBlocksTable).where(eq(contentBlocksTable.section, section));
  if (!block) {
    res.status(404).json({ error: "Section not found" });
    return;
  }
  res.json(block);
});

export default router;
