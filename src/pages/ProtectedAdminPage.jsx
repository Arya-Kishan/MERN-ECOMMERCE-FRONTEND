import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminPage({ children }) {

    const user = useSelector(selectLoggedInUser)

    if (!user) {
        return <Navigate to={'/login'} ></Navigate>
    }

    if (user && user.role == 'admin') {
        return children;
    }

    return <Navigate to={'/'}></Navigate>;

}
