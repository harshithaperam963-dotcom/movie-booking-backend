import { Router } from "express";
import prisma from "../config/prisma";
import {
  protect,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile",
  protect,
  async (req: AuthRequest, res) => {
    const user =
      await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });

    res.json(user);
  }
);

export default router;