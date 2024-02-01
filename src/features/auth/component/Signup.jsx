import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync, selectLoggedInUser } from '../authSlice'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {

    const loggedInUser = useSelector(selectLoggedInUser)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    const handleCreateAccount = (data, e) => {
        e.preventDefault();
        let newUser = { ...data }
        delete newUser.confirmPassword;
        dispatch(createUserAsync(newUser));
    }

    return (
        <div>
            {loggedInUser && <Navigate to='/' />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="profile.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit((data, e) => {
                        e.preventDefault();
                        handleCreateAccount(data, e);
                    })}>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    {...register("name")}
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <input
                                    id="password"
                                    {...register("password")}
                                    type={!showPassword1 ? "password" : "text"}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {!showPassword1 ? <span onClick={() => setShowPassword1(true)}><VisibilityOffIcon /></span> : <span onClick={() => setShowPassword1(false)}><VisibilityIcon /></span>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <input
                                    id="confirmPassword"
                                    {...register("confirmPassword")}
                                    type={!showPassword2 ? "password" : "text"}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {!showPassword2 ? <span onClick={() => setShowPassword2(true)}><VisibilityOffIcon /></span> : <span onClick={() => setShowPassword2(false)}><VisibilityIcon /></span>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Log In

                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
