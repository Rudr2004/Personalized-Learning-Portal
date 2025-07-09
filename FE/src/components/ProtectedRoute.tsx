// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const token = localStorage.getItem("registeredUser");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
