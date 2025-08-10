export default function (allMovies, genre) {
  if (genre === "All") return allMovies;
  else
    return allMovies.filter((movie) =>
      movie.genre.some((g) => g.name === genre)
    );
}
