import prisma from "../config/prisma";

async function seed() {
  try {
   await prisma.reservationSeat.deleteMany();
await prisma.reservation.deleteMany();
await prisma.booking.deleteMany();
await prisma.show.deleteMany();

await prisma.seat.deleteMany();
await prisma.screen.deleteMany();
await prisma.theatre.deleteMany();
    const theatres = [
      {
        name: "PVR Vijayawada",
        city: "Vijayawada",
      },
      {
        name: "INOX Hyderabad",
        city: "Hyderabad",
      },
      {
        name: "Cinepolis Vizag",
        city: "Visakhapatnam",
      },
    ];

    for (const theatreData of theatres) {
      const theatre =
        await prisma.theatre.create({
          data: theatreData,
        });

      const screen =
        await prisma.screen.create({
          data: {
            name: "Screen 1",
            theatreId: theatre.id,
          },
        });
      const shows = [
  {
    movieId: "tt0816692", // Interstellar
    startTime: new Date(),
    screenId: screen.id,
  },
  {
    movieId: "tt1375666", // Inception
    startTime: new Date(
      Date.now() + 3 * 60 * 60 * 1000
    ),
    screenId: screen.id,
  },
];

await prisma.show.createMany({
  data: shows,
});

      const rows = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
      ];

      const seats = [];

      for (const row of rows) {
        for (let i = 1; i <= 10; i++) {
          seats.push({
            rowNumber: row,
            seatNumber: `${row}${i}`,
            screenId: screen.id,
          });
        }
      }

      await prisma.seat.createMany({
        data: seats,
      });
    }

    console.log(
      "✅ 3 Theatres Created"
    );

    console.log(
      "✅ 300 Seats Created"
    );
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();