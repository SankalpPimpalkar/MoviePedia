import React, { useEffect, useState } from 'react'
import { moviesAPI } from '../api/api'
import MovieCard from '../components/ui/MovieCard'
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton'

export default function Home() {

    const [movies, setMovies] = useState([])
    const [isLoadingMovies, setIsLoadingMovies] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingMovies(true)
                const response = await moviesAPI.getAllMovies()
                console.log(response)
                if (response.movies && Array.isArray(response.movies)) {
                    setMovies(response.movies)
                }
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : "Error Occured in Getting User")
            } finally {
                setIsLoadingMovies(false)
            }
        })()
    }, [])

    return (
        <div className='text-white pt-5 grid grid-cols-4 gap-4'>
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
    )
}
