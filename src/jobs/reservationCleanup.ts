import cron from "node-cron";
import prisma from "../config/prisma";

export const startReservationCleanup = () => {
  console.log(
  "Reservation cleanup scheduler started"
);
  
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const expiredReservations =
        await prisma.reservation.findMany({
          where: {
            expiresAt: {
              lt: now,
            },
            status: "ACTIVE",
          },
        });

      for (const reservation of expiredReservations) {
        await prisma.reservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            status: "EXPIRED",
          },
        });

        await prisma.reservationSeat.deleteMany({
          where: {
            reservationId: reservation.id,
          },
        });
      }

      if (expiredReservations.length > 0) {
        console.log(
          `Released ${expiredReservations.length} expired reservations`
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
};