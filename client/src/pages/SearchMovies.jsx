import React from 'react'
import { Search } from "lucide-react"

export default function SearchMovies() {
    return (
        <div className='pt-5'>
            <div
                className="
                    flex items-center gap-3
                    px-4 py-3
                    rounded-lg
                    bg-[#1f1f1f]/80
                    backdrop-blur-md
                    border border-white/10
            "
            >
                <Search className="text-gray-400 size-6 shrink-0" />

                <input
                    type="text"
                    placeholder="Search movies, actors, genres..."
                    autoFocus
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
        </div>
    )
}
