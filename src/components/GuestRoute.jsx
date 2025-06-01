import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return !user ? children : <Navigate to="/dashboard" replace />;
}
