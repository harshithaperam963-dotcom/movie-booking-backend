import prisma from "../config/prisma";

async function main() {

  const screen =
    await prisma.screen.findFirst();

  if (!screen) {
    console.log("No screen found");
    return;
  }

  const show =
    await prisma.show.create({
      data: {
        movieId: "tt0816692",
        startTime: new Date(),
        screenId: screen.id,
      },
    });

  console.log(show);
}

main();