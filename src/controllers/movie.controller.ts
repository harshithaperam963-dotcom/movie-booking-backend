import { Request, Response } from "express";

import {
  getTrendingMovies,
  searchMovies,
  getMovieById,
} from "../services/movie.service";

export const trendingMovies = async (
  _req: Request,
  res: Response
) => {
  try {
    const movies =
      await getTrendingMovies();

    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchMovie = async (
  req: Request,
  res: Response
) => {
  try {
    const query =
      req.query.query as string;

    const movies =
      await searchMovies(query);

    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const movieDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const imdbID =
  req.params.imdbID as string;

const movie =
  await getMovieById(imdbID);

    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};