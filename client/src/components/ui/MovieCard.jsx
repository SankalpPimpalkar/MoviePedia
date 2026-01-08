import { Rating } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from 'react-router';

export default function MovieCard({ movie }) {
    return (
        <Link to={`/movies/${movie._id}`} className='col-span-1 space-y-1'>
            <img className='aspect-2/3 duration-500 rounded' src={movie.poster} alt="" />
            <Rating
                className='pt-2'
                size="small"
                value={movie.rating}
                max={10}
                readOnly
                precision={0.5}
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarBorderIcon fontSize="small" />}
            />
            <h3 className='font-bold text-lg'>
                {movie.title}
            </h3>
            <p className='text-gray-600 text-sm'>
                {new Date(movie.releaseDate).getFullYear()}
            </p>
        </Link>
    )
}
