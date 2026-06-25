import { Router } from "express";
import {
  reserveSeats,
} from "../controllers/reservation.controller";

const router = Router();

router.post(
  "/",
  reserveSeats
);

export default router;