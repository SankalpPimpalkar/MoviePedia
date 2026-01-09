import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, Outlet } from "react-router";

export default function ProtectedLayout() {
    const { isAuthenticated, user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated || !user?.isAdmin) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, user, isLoading, navigate]);

    if (isLoading) {
        return (
            <h3 className="min-h-screen flex items-center justify-center text-white">
                Checking permissions...
            </h3>
        );
    }

    return <Outlet />;
}
