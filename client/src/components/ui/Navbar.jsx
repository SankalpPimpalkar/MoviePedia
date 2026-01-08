import { Button, Container } from '@mui/material'
import { useAuth } from '../../context/AuthProvider'
import { Link, useNavigate } from 'react-router'
import { Search } from "lucide-react"

export default function Navbar() {

    const { isAuthenticated, user } = useAuth()
    const navigate = useNavigate()

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
                            <p>
                                Hello, {user?.name}
                            </p>
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
