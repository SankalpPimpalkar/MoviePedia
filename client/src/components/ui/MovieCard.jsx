import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router";

export default function MovieCard({ movie }) {
    return (
        <Link
            to={`/movies/${movie._id}`}
            className="space-y-2 group"
        >
            <img
                src={movie.poster}
                alt={movie.title}
                className="
                    aspect-2/3
                    w-full
                    object-cover
                    rounded-lg
                    transition-transform
                    duration-300
                    group-hover:scale-[1.03]
                    "
            />

            <Rating
                size="small"
                value={movie.rating}
                max={10}
                readOnly
                precision={0.5}
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarBorderIcon fontSize="small" />}
            />

            <h3 className="font-semibold text-sm text-white line-clamp-1">
                {movie.title}
            </h3>

            <p className="text-gray-500 text-xs">
                {movie.releaseDate
                    ? new Date(movie.releaseDate).getFullYear()
                    : "—"}
            </p>
        </Link>
    );
}
