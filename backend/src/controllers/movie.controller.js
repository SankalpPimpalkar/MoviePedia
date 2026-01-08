import cloudinary from "../configs/cloudinary.conf.js";
import Movie from "../models/movie.model.js";

export async function createMovie(req, res) {
    try {
        const {
            title,
            description,
            rating,
            releaseDate,
            duration,
            genres
        } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({ message: "Movie title is required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Poster is required" });
        }

        const existingMovie = await Movie.findOne({ title });

        if (existingMovie) {
            return res
                .status(400)
                .json({ message: "Movie already exists" });
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "posters"
        });

        const movie = await Movie.create({
            title,
            description,
            rating,
            releaseDate,
            duration,
            genres,
            poster: uploadResult.secure_url,
            source: "ADMIN"
        });

        return res.status(201).json({
            message: "Movie created successfully",
            movie
        });

    } catch (error) {
        console.error("Error in Create Movie:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function getMovies(req, res) {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });

        return res.status(200).json({
            count: movies.length,
            movies
        });

    } catch (error) {
        console.error("Error in Get Movies:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function getMovieById(req, res) {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res
                .status(404)
                .json({ message: "Movie not found" });
        }

        return res.status(200).json({ movie });

    } catch (error) {
        console.error("Error in Get Movie By ID:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function updateMovie(req, res) {
    try {
        const { id } = req.params;
        console.log(req.body)

        if (!req.body || Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({ message: "No fields provided for update" });
        }

        const updatedValues = {};

        if (req.body.title !== undefined)
            updatedValues.title = req.body.title;

        if (req.body.description !== undefined)
            updatedValues.description = req.body.description;

        if (req.body.releaseDate !== undefined)
            updatedValues.releaseDate = req.body.releaseDate;

        if (req.body.duration !== undefined)
            updatedValues.duration = req.body.duration;

        if (Array.isArray(req.body.genres))
            updatedValues.genres = req.body.genres;

        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { $set: updatedValues },
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res
                .status(404)
                .json({ message: "Movie not found" });
        }

        return res.status(200).json({
            message: "Movie updated successfully",
            movie: updatedMovie
        });

    } catch (error) {
        console.error("Error in Update Movie:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function deleteMovie(req, res) {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res
                .status(404)
                .json({ message: "Movie not found" });
        }

        if (movie.source == "ADMIN") {
            const publicId = "posters/" + movie.poster.split("/posters/")[1]?.split(".")[0];
            if (publicId) await cloudinary.uploader.destroy(publicId);
        }

        await Movie.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Movie deleted successfully"
        });

    } catch (error) {
        console.error("Error in Delete Movie:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}
