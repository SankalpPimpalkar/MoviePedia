import Movie from "./src/models/movie.model.js";
import connectDB from "./src/configs/db.conf.js";
import { imdbMovies } from "./data.js";

function normalizeIMDbMovie(raw) {
    return {
        title: raw.Title,
        description: raw.Plot,
        rating: Number(raw.imdbRating),
        releaseDate: raw.Released ? new Date(raw.Released) : null,
        duration: raw.Runtime ? parseInt(raw.Runtime) : null,
        genres: raw.Genre ? raw.Genre.split(",").map(g => g.trim()) : [],
        poster: raw.Poster,
        source: "IMDB"
    };
}

async function seed() {
    try {
        await connectDB();
        console.log("✅ DB Connected");

        for (const rawMovie of imdbMovies) {
            const movie = normalizeIMDbMovie(rawMovie);

            await Movie.updateOne(
                { title: movie.title },
                { $set: movie },
                { upsert: true }
            );

            console.log(`🌱 Seeded: ${movie.title}`);
        }

        console.log("🎉 IMDb seeding completed");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();
