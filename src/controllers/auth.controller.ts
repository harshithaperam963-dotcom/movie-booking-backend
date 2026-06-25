import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    const token =
      generateToken(user.id);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token =
      generateToken(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};