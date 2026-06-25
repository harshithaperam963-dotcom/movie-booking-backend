import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getShows = async (
  req: Request,
  res: Response
) => {
  try {
    const shows =
      await prisma.show.findMany({
        include: {
          screen: {
            include: {
              theatre: true,
            },
          },
        },
      });

    res.json(shows);
  } catch (error) {
    res.status(500).json(error);
  }
};