import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/db-test", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Database Connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;