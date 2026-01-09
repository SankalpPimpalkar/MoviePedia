import { Button, Container } from "@mui/material"
import { useAuth } from "../../context/AuthProvider"
import { Link, useNavigate } from "react-router"
import { Github, Search, Menu } from "lucide-react"
import { usersAPI } from "../../api/api"
import { useEffect, useState } from "react"

export default function Navbar() {
    const { isAuthenticated, user, refetch } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    async function handleLogout() {
        try {
            await usersAPI.logout()
            refetch()
            navigate("/")
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : "Something went wrong"
            )
        }
    }

    // 🔹 Close menu when switching to desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <nav className="bg-[#1a1a1a] text-white py-4 px-0  sm:p-4 sticky top-0 z-50">
            <Container maxWidth="lg" className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="font-semibold text-lg">
                    MoviePedia
                </Link>

                <div className="flex items-center gap-4 relative">
                    {/* Search (always visible) */}
                    <button onClick={() => navigate("/search")}>
                        <Search className="text-gray-200" />
                    </button>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <p className="text-sm">Hello, {user?.name}</p>
                                <Button
                                    size="small"
                                    variant="text"
                                    onClick={() => navigate("/add-movie")}
                                >
                                    Add Movie
                                </Button>
                                <Button
                                    size="small"
                                    variant="text"
                                    color="error"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="small"
                                variant="text"
                                onClick={() => navigate("/auth/login")}
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <Menu className="text-white" />
                    </button>

                    {/* Mobile dropdown */}
                    {menuOpen && (
                        <div className="absolute right-0 top-12 w-44 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg md:hidden">
                            {isAuthenticated ? (
                                <>
                                    <p className="px-4 py-2 text-sm text-gray-400">
                                        Hello, {user?.name}
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigate("/add-movie")
                                            setMenuOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a]"
                                    >
                                        Add Movie
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setMenuOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#2a2a2a]"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        navigate("/auth/login")
                                        setMenuOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a]"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    )}

                    {/* GitHub */}
                    <a
                        href="https://github.com/SankalpPimpalkar/MoviePedia"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github fill="white" className="size-5" />
                    </a>
                </div>
            </Container>
        </nav>
    )
}
