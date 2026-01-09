import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { moviesAPI } from "../api/api";

export default function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        releaseDate: "",
        duration: "",
        genres: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await moviesAPI.getMovieById(id);

                if (response.movie) {
                    setForm({
                        title: response.movie.title || "",
                        description: response.movie.description || "",
                        releaseDate: response.movie.releaseDate
                            ? response.movie.releaseDate.slice(0, 10)
                            : "",
                        duration: response.movie.duration || "",
                        genres: response.movie.genres?.join(", ") || ""
                    });
                }
            } catch (error) {
                console.error("Fetch movie error:", error);
            } finally {
                setIsFetching(false);
            }
        })();
    }, [id]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {};

        if (form.title) payload.title = form.title;
        if (form.description) payload.description = form.description;
        if (form.releaseDate) payload.releaseDate = form.releaseDate;
        if (form.duration) payload.duration = Number(form.duration);

        if (form.genres.trim()) {
            payload.genres = form.genres
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean);
        }

        if (Object.keys(payload).length === 0) {
            alert("No fields to update");
            return;
        }

        try {
            setIsLoading(true);
            await moviesAPI.editMovie(id, payload);
            navigate(`/movies/${id}`);
        } catch (error) {
            console.error("Update movie error:", error);
            alert("Failed to update movie");
        } finally {
            setIsLoading(false);
        }
    }

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading movie...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto pt-6 px-4 text-white">
            <h1 className="text-2xl font-semibold mb-6">Edit Movie</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-[#1f1f1f] border border-white/10 p-6 rounded-xl"
            >
                {/* Title */}
                <input
                    name="title"
                    placeholder="Movie Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                />

                {/* Duration */}
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (mins)"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                />

                {/* Release Date */}
                <input
                    type="date"
                    name="releaseDate"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                />

                {/* Genres */}
                <input
                    name="genres"
                    placeholder="Genres (comma separated)"
                    value={form.genres}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="
                        w-full py-2.5 rounded-lg
                        bg-blue-600 hover:bg-blue-700
                        transition font-medium
                        disabled:opacity-50
                    "
                >
                    {isLoading ? "Updating..." : "Update Movie"}
                </button>
            </form>
        </div>
    );
}
