import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getTheatres = async (
  _req: Request,
  res: Response
) => {
  try {
    const theatres =
      await prisma.theatre.findMany();

    res.json(theatres);
  } catch (error) {
    res.status(500).json(error);
  }
};