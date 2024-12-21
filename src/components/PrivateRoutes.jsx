import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../api/utils/AuthProvider";

const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to='/home' />
}

export default PrivateRoutes;

