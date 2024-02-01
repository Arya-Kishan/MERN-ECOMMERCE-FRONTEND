import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAsync, selectResetStatus } from '../authSlice';
import { useNavigate } from 'react-router-dom'
import PageNotFound from '../../../pages/PageNotFound';

export default function ResetPassword() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search);
  const email = (query.get('email'));
  const token = (query.get('token'));
  const resetStatus = useSelector(selectResetStatus)
  const navigate = useNavigate();



  const handleResetPassword = (data, e) => {
    e.preventDefault();
    const newPassword = { password: data.confirmPassword, token: token, email: email }
    dispatch(resetPasswordAsync(newPassword))
  }

  useEffect(() => {
    if (resetStatus?.message == 'SUCCESS') {
      navigate("/login")
    }
  }, [resetStatus])

  return (
    <div>
      {(email && token) ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              RESET PASSWORD
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit((data, e) => {
              handleResetPassword(data, e);
            })}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    {...register("newPassword")}
                    type="password"
                    autoComplete="newPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
              </div>
            </form>

          </div>
        </div>
      ) : (<PageNotFound />)}
    </div>
  )
}