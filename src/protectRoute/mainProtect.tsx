import { useAuth } from "react-oidc-context"
import { Navigate, Outlet } from "react-router-dom";
import AuthLoader from "../components/loader";

const MainProtectMiddleware = ()=> {
    const auth = useAuth();
    if(auth.isLoading) return <AuthLoader />;
    if(auth.isAuthenticated) {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export default MainProtectMiddleware;