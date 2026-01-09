import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { moviesAPI } from "../api/api";
import MovieCard from "../components/ui/MovieCard";
import MovieCardSkeleton from "../components/ui/MovieCardSkeleton";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchMovies() {
    const [movies, setMovies] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(false);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingMovies(true);
                const response = await moviesAPI.getSearchedMovies({
                    q: debouncedSearch.trim() || ""
                });
                console.log(response)

                if (Array.isArray(response.movies)) {
                    setMovies(response.movies);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoadingMovies(false);
            }
        })();
    }, [debouncedSearch]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingMovies(true);
                const response = await moviesAPI.getSearchedMovies();

                if (Array.isArray(response.movies)) {
                    setMovies(response.movies);
                }
            } catch (error) {
                console.error("Fetch movies error:", error);
            } finally {
                setIsLoadingMovies(false);
            }
        })();
    }, []);

    return (
        <div className="pt-6">
            <div
                className="
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    bg-[#1f1f1f]/80
                    backdrop-blur-md
                    border border-white/10
                    focus-within:ring-2
                    focus-within:ring-blue-500/20
                "
            >
                <Search className="text-gray-400 size-5 shrink-0" />
                <input
                    type="text"
                    placeholder="Search movies by title or description"
                    value={search}
                    autoFocus
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        w-full
                        bg-transparent
                        text-gray-200
                        placeholder-gray-500
                        text-base
                        outline-none
                    "
                />
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {isLoadingMovies ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))
                ) : movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No movies found
                    </p>
                )}
            </div>
        </div>
    );
}
