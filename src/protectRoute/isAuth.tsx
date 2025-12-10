import React from "react";
import { useAuth } from "@hooks";
import AuthLoader from "../components/loader";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyMiddleware:React.FC = ()=> {
    const { isLoading, isAuthenticated } = useAuth();
    if(isLoading) return <AuthLoader />;
    if(isAuthenticated) return <Navigate to="/aws-cognito-welcom" replace />;
    return <Outlet />;
}

export default PublicOnlyMiddleware;