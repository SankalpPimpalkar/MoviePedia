import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { moviesAPI } from "../api/api";
import { useAuth } from "../context/AuthProvider";
import MovieCard from "../components/ui/MovieCard";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [movie, setMovie] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await moviesAPI.getMovieById(id);
                if (response.movie) {
                    setMovie(response.movie);
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (!movie?.genres || movie.genres.length === 0) return;

        (async () => {
            try {
                setIsLoadingRecommendations(true);

                const genreString = movie.genres.join(",");

                const response = await moviesAPI.getSearchedMovies({
                    genres: genreString
                });

                if (Array.isArray(response.movies)) {
                    // exclude current movie
                    const filtered = response.movies.filter(
                        (m) => m._id !== movie._id
                    );
                    setRecommended(filtered.slice(0, 20));
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setIsLoadingRecommendations(false);
            }
        })();
    }, [movie]);

    async function handleDelete() {
        const confirm = window.confirm("Are you sure you want to delete this movie?");
        if (!confirm) return;

        try {
            await moviesAPI.deleteMovie(id);
            navigate("/");
        } catch (error) {
            console.error("Delete movie error:", error);
            alert("Failed to delete movie");
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading movie...
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Movie not found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 pt-6 text-white space-y-10">
            {/* 🔹 Movie Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Poster */}
                <div>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full max-w-sm aspect-2/3 object-cover rounded-xl"
                    />
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>

                    <Rating
                        value={movie.rating}
                        max={10}
                        readOnly
                        precision={0.5}
                        icon={<StarIcon fontSize="small" />}
                        emptyIcon={<StarBorderIcon fontSize="small" />}
                    />

                    <div className="text-gray-400 text-sm space-x-4">
                        {movie.releaseDate && (
                            <span>{new Date(movie.releaseDate).getFullYear()}</span>
                        )}
                        {movie.duration && <span>{movie.duration} min</span>}
                    </div>

                    {movie.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="px-3 py-1 text-xs rounded-full bg-[#232323]"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-gray-300 leading-relaxed">
                        {movie.description || "No description available."}
                    </p>

                    {user?.isAdmin && (
                        <div className="flex gap-3 pt-4">
                            <Button onClick={() => navigate(`/edit-movie/${movie._id}`)} variant="outlined" color='primary'>
                                Edit
                            </Button>
                            <Button onClick={handleDelete} variant="outlined" color='error'>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Recommended Movies
                </h2>

                {isLoadingRecommendations ? (
                    <p className="text-gray-400">Loading recommendations...</p>
                ) : recommended.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {recommended.map((rec) => (
                            <MovieCard key={rec._id} movie={rec} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No recommendations available
                    </p>
                )}
            </div>
        </div>
    );
}
