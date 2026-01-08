import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, Outlet } from "react-router"

export default function ProtectedLayout() {

    const { isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()

    if (!isAuthenticated && !isLoading) {
        navigate("/auth/login")
        return
    }

    if (isLoading) {
        return null
    }

    return <Outlet />
}
