import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getSeats = async (
  req: Request,
  res: Response
) => {
  try {
    const { showId } = req.query;

    const seats =
      await prisma.seat.findMany();

    if (!showId) {
      return res.json(seats);
    }

    const reservationSeats =
      await prisma.reservationSeat.findMany({
        where: {
          reservation: {
            showId: showId as string,
          },
        },
        include: {
          reservation: true,
        },
      });

    const bookedSeatIds =
      reservationSeats
        .filter(
          (seat) =>
            seat.reservation.status ===
              "ACTIVE" ||
            seat.reservation.status ===
              "CONFIRMED"
        )
        .map((seat) => seat.seatId);

    const seatsWithStatus =
      seats.map((seat) => ({
        ...seat,
        isBooked:
          bookedSeatIds.includes(
            seat.id
          ),
      }));

    res.json(seatsWithStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};