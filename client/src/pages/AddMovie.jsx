import React, { useState } from "react";
import { moviesAPI } from "../api/api";
import { useNavigate } from "react-router";

export default function AddMovie() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
        genres: ""
    });

    const [poster, setPoster] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handlePosterChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        setPoster(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!poster) {
            alert("Poster is required");
            return;
        }

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("rating", form.rating);
        formData.append("releaseDate", form.releaseDate);
        formData.append("duration", form.duration);
        formData.append(
            "genres",
            form.genres
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean)
        );

        formData.append("poster", poster);

        try {
            setIsLoading(true);
            await moviesAPI.createMovie(formData);
            navigate("/");
        } catch (error) {
            console.error("Create movie error:", error);
            alert("Failed to create movie");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto pt-6 px-4 text-white">
            <h1 className="text-2xl font-semibold mb-6">Add Movie</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-[#1f1f1f] border border-white/10 p-6 rounded-xl"
            >
                {/* Title */}
                <input
                    name="title"
                    placeholder="Movie Title *"
                    value={form.title}
                    onChange={handleChange}
                    required
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

                {/* Rating + Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="10"
                        name="rating"
                        placeholder="Rating (0–10)"
                        value={form.rating}
                        onChange={handleChange}
                        className="px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                    />

                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (mins)"
                        value={form.duration}
                        onChange={handleChange}
                        className="px-4 py-2.5 rounded bg-[#121212] border border-white/10 outline-none"
                    />
                </div>

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

                {/* Poster Upload */}
                <div>
                    <label className="block mb-2 text-sm text-gray-400">
                        Poster *
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterChange}
                        className="block w-full text-sm text-gray-400"
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Poster preview"
                            className="mt-4 w-40 aspect-2/3 rounded object-cover"
                        />
                    )}
                </div>

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
                    {isLoading ? "Creating..." : "Create Movie"}
                </button>
            </form>
        </div>
    );
}
