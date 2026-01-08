import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        index: true,
        min: 1,
        max: 10
    },
    releaseDate: {
        type: Date,
    },
    duration: {
        type: Number
    },
    genres: [String],
    poster: {
        type: String
    },
    source: {
        type: String,
        enum: ["IMDB", "ADMIN"],
        default: "ADMIN"
    }
},
    { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema)
export default Movie;