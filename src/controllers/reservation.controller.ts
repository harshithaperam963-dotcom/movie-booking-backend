import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { Prisma } from "@prisma/client";
import { getIO } from "../socket";

export const reserveSeats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { seatIds, movieId,theatreId } = req.body;
    console.log("==== RESERVATION REQUEST ====");

    console.log("SeatIds:", seatIds);

console.log("movieId:", movieId);
let show =
  await prisma.show.findFirst({
    where: {
      movieId,
      screen: {
        theatreId,
      },
    },
  });

if (!show) {
  const screen =
    await prisma.screen.findFirst({
      where: {
        theatreId,
      },
    });

  if (!screen) {
    return res.status(400).json({
      success: false,
      message:
        "No screen found",
    });
  }

  show =
    await prisma.show.create({
      data: {
        movieId,
        screenId: screen.id,
        startTime: new Date(),
      },
    });
}
if (!show) {
  return res.status(404).json({
    success: false,
    message:
      "No show found for this movie",
  });
}


    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one seat",
      });
    }

    const reservation = await prisma.$transaction(
      async (tx) => {
        const existingSeats =
  await tx.reservationSeat.findMany({
    where: {
      seatId: {
        in: seatIds,
      },
    },
  });

if (existingSeats.length > 0) {
  throw new Error(
    "Seat already booked"
  );
}

        const reservation =
          await tx.reservation.create({
            data: {
              userId: "cb754339-d6e2-4419-adb0-d6b5fa97d3ff",
             showId: show.id,
              expiresAt: new Date(
                Date.now() + 2 * 60 * 1000
              ),
              status: "ACTIVE",
            },
          });

        await tx.reservationSeat.createMany({
          data: seatIds.map(
            (seatId: string) => ({
              seatId,
              reservationId: reservation.id,
            })
          ),
        });

        return reservation;
      },
      {
        isolationLevel:
          Prisma.TransactionIsolationLevel.Serializable,
      }
    );
getIO().emit("seatReserved", {
  seatIds,
  showId: show.id,
      });
    return res.status(200).json({
      success: true,
      message: "Seats locked successfully",
      reservation,
      expiresIn: "2 minutes",
    });
  } catch (error: any) {

  console.error(
    "RESERVATION ERROR:",
    error
  );

  return res.status(400).json({
    success: false,
    message:
      error.message ||
      "Failed to reserve seats",
  });
}
  };
