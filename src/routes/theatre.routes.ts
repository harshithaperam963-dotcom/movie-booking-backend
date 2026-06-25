import { Router } from "express";
import { getTheatres }
from "../controllers/theatre.controller";

const router = Router();

router.get("/", getTheatres);

export default router;