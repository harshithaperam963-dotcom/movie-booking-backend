import { Router } from "express";

import {
  trendingMovies,
  searchMovie,
  movieDetails,
} from "../controllers/movie.controller";

const router = Router();

router.get(
  "/trending",
  trendingMovies
);

router.get(
  "/search",
  searchMovie
);

router.get(
  "/:imdbID",
  movieDetails
);

export default router;