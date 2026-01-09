import React, { useEffect, useState } from 'react'
import { moviesAPI } from '../api/api'
import MovieCard from '../components/ui/MovieCard'
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton'
import { Pagination } from '@mui/material'

export default function Home() {

    const [movies, setMovies] = useState([])
    const [isLoadingMovies, setIsLoadingMovies] = useState(false)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchMovies(page)
    }, [page])

    async function fetchMovies(currentPage) {
        try {
            setIsLoadingMovies(true)

            const response = await moviesAPI.getSearchedMovies({
                page: currentPage
            })

            if (response.movies && Array.isArray(response.movies)) {
                setMovies(response.movies)
                setTotalPages(Math.ceil(response.total / response.pageSize))
            }

        } catch (error) {
            console.error("Error fetching movies", error)
        } finally {
            setIsLoadingMovies(false)
        }
    }

    return (
        <div className="text-white pt-5 space-y-8">

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

            {/* Pagination */}
            {!isLoadingMovies && totalPages > 1 && (
                <div className="flex justify-center py-6 text-white">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        shape="rounded"
                        variant='outlined'
                        showFirstButton
                        showLastButton
                        color='primary'
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#e5e7eb",       
                                borderColor: "#374151",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#2563eb !important",
                                color: "#fff",
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "#374151",
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                color: "#9ca3af",
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}
