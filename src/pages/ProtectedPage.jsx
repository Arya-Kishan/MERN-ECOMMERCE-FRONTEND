import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom';

export default function ProtectedPage({ children }) {

  const loggedInUser = useSelector(selectLoggedInUser)

  if (!loggedInUser) {
    return <Navigate to={'/login'} ></Navigate>
  }

  return children;

}
