import { Button, Container } from '@mui/material'
import { useAuth } from '../../context/AuthProvider'
import { Link, useNavigate } from 'react-router'
import { Plus, Search } from "lucide-react"
import { usersAPI } from '../../api/api'

export default function Navbar() {

    const { isAuthenticated, user, refetch } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await usersAPI.logout()
            refetch()
            navigate("/")
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Something went wrong")
        }
    }

    return (
        <nav className='bg-[#1a1a1a] text-white p-4 sticky top-0 z-50'>
            <Container maxWidth="lg" className='w-full flex items-center justify-between'>
                <Link to={"/"} className='font-semibold'>
                    MoviePedia
                </Link>

                <span className='flex items-center gap-4'>

                    <button className='cursor-pointer' onClick={() => navigate("/search")}>
                        <Search className='text-gray-200' />
                    </button>

                    {
                        isAuthenticated ? (
                            <span className='flex items-center gap-4'>
                                <p className='text-sm'>
                                    Hello, {user?.name}
                                </p>
                                <Button onClick={() => navigate("/add-movie")} size='small' variant="text" color='primary'>
                                    Add Movie
                                </Button>
                                <Button onClick={handleLogout} size='small' variant="text" color='error'>
                                    Logout
                                </Button>
                            </span>
                        ) :
                            (
                                <Button onClick={() => navigate("/auth/login")} size='small' variant="text">
                                    Login
                                </Button>
                            )
                    }
                </span>
            </Container>
        </nav >
    )
}
