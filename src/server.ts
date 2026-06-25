import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import testRoutes from "./routes/test.routes";
import movieRoutes from "./routes/movie.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import reservationRoutes from "./routes/reservation.routes";
import seatRoutes from "./routes/seat.routes";
import showRoutes from "./routes/show.routes";
import theatreRoutes
from "./routes/theatre.routes";

import { startReservationCleanup } from "./jobs/reservationCleanup";
import { initSocket } from "./socket";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/seats", seatRoutes);

app.use("/api/shows", showRoutes);

app.use(
  "/api/theatres",
  theatreRoutes
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "My Movie Backend Running",
  });
});

console.log("Calling cleanup scheduler...");
startReservationCleanup();


const server = http.createServer(app);


initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});