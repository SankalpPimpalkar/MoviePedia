import { Outlet } from "react-router"
import { Container } from "@mui/material"
import Navbar from "../components/ui/Navbar"

export default function MainLayout() {
    return (
        <div className="w-full min-h-screen bg-black">
            <Navbar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </div>
    )
}
