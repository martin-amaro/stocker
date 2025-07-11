import React from 'react'
import { useAuth } from '../../context/AuthContext';

export const Guest = ({children}) => {
    const { user, logout } = useAuth();
    if (user) return null;
  return (
    <>{children}</>
  )
}