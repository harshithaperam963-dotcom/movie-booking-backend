import { Router } from "express";
import { getShows } from "../controllers/show.controller";

const router = Router();

router.get("/", getShows);

export default router;