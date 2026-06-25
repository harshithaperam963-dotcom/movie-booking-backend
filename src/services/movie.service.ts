import axios from "axios";

const API_KEY = process.env.OMDB_API_KEY;

export const getTrendingMovies = async () => {
  const movies = [
    "Interstellar",
    "Inception",
    "Avatar",
    "The Dark Knight",
    "Avengers Endgame",
    "Joker"
  ];

  const responses = await Promise.all(
    movies.map((movie) =>
      axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movie)}`
      )
    )
  );

  return responses.map((r) => r.data);
};

export const searchMovies = async (query: string) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );

  return response.data;
};
export const getMovieById = async (
  imdbID: string
) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`
  );

  return response.data;
};