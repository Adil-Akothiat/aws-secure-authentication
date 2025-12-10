import { useAuth } from "@hooks"
import { Navigate, Outlet } from "react-router-dom";
import AuthLoader from "../components/loader";

const MainProtectMiddleware = ()=> {
    const { isLoading, isAuthenticated } = useAuth();
    if(isLoading) return <AuthLoader />;
    if(isAuthenticated) {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export default MainProtectMiddleware;