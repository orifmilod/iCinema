
export default function categorize(allMovies, genre)
{
    if(genre === "All") return allMovies;
    else {
        const movies = allMovies.filter(movie => movie.genre === genre)
        return movies;
    }
}