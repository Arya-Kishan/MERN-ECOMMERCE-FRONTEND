import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, updateUserAddressesAsync } from '../../auth/authSlice';
import { UserIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';

export default function UserProfile() {

  const user = useSelector(selectLoggedInUser);
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const handleAddAddress = (data) => {
    let newAddress = { id: user._id, addresses: [...user.addresses, data], message: "ADD" }
    console.log(newAddress);
    dispatch(updateUserAddressesAsync(newAddress))
  }

  const handleDeleteAddress = (addressIndex) => {
    let addresses = [...user.addresses]
    addresses.splice(addressIndex, 1)
    let newAddress = { id: user._id, addresses: [...addresses], message: "DELETE" }
    dispatch(updateUserAddressesAsync(newAddress))
  }

  return (
    <div className='p-2 mt-5'>
      <div className='text-4xl flex items-center'> <UserIcon className='w-10 h-10' /> Profile</div>

      <div className='flex flex-col gap-1 mt-5'>
        <p className='flex items-center'>{user.name}</p>
        <p className='flex items-center'>{user.email}</p>
        <p className='flex items-center'>Role : {user.role}</p>
      </div>

      <div>
        <form className='p-1' onSubmit={handleSubmit((data) => {
          handleAddAddress(data);
        })}>
          {showForm && <>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Add Address</h2>

                {/* ADDRESS FORM */}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("firstName")}
                        id="firstName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("lastName")}
                        id="lastName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country")}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>Nepal</option>
                        <option>Sri Lanka</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street")}
                        id="street"
                        autoComplete="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city")}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state")}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode")}
                        id="pinCode"
                        autoComplete="pinCode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ADD AND CANCEL BUTTON */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button onClick={e => setShowForm(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </>}

          {/* SELECTING ADDRESS */}
          <div className="border-b border-gray-900/10 pb-12">
            <div className='flex justify-between pt-10 pb-4'>
              <h2 className="font-semibold leading-7 text-gray-900 text-2xl">Addresses</h2>
              {!showForm && <div onClick={e => setShowForm(true)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New</div>}
            </div>
            {/* SHOWING ADDRESSES */}
            <div className='flex flex-col gap-10 mt-6'>
              {user?.addresses.map((address, i) => (
                <div key={i} className="w-full flex flex-col justify-between gap-3 p-2 border-solid border-2 border-gray-200 relative">

                  <div onClick={() => handleDeleteAddress(i)} className='text-end absolute -top-7 right-0 bg-gray-100 cursor-pointer hover:bg-red-400'>Delete <ClearIcon /></div>

                  <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName}</p>
                    <p className="mt-1 truncate text-xs">{address.country}</p>
                  </div>

                  <div className="w-full flex justify-between">

                    <div>
                      <p className="mt-1 truncate text-xs">{address.street},{address.city}</p>
                      <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                    </div>

                    <p className="text-sm leading-6 text-gray-900">{address.pinCode}</p>

                  </div>

                </div>
              ))}
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}

