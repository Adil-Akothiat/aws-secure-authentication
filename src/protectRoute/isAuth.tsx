import React from "react";
import { useAuth } from "react-oidc-context";
import AuthLoader from "../components/loader";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyMiddleware:React.FC = ()=> {
    const auth = useAuth();
    if(auth.isLoading) return <AuthLoader />;
    if(auth.isAuthenticated) return <Navigate to="/aws-cognito-welcom" replace />;
    return <Outlet />;
}

export default PublicOnlyMiddleware;