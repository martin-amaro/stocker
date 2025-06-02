import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const { logout, loading } = useAuth();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        logout();
        setRedirect(true);
    }, [logout]);

    if (loading) return <LoadingSpinner />;
    if (redirect) return <Navigate to="/login" replace />;

    return null;
}
