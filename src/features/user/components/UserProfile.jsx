import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice';
import { UserIcon } from '@heroicons/react/24/outline'

export default function UserProfile() {

  const user = useSelector(selectLoggedInUser);

  return (
    <div className='p-2'>
      <div className='text-4xl flex items-center'> <UserIcon className='w-10 h-10' /> Profile</div>

      <div>
        <p className='flex items-center'>{user.name}</p>
        <p className='flex items-center'>{user.email}</p>
        <p className='flex items-center'>Role : {user.role}</p>
      </div>

      <div className='flex flex-col gap-5'>
        <p className='text-3xl'>Available Adresses</p>
        {user.addresses.map((e,i) => (
          <div className='flex flex-col gap-4 border-solid border-2 border-black p-4' key={i}>

            <div className='flex justify-between'>
              <span>{e.firstName},{e.lastNmae}</span>
              <span>{e.country}</span>
            </div>

            <div className='flex justify-between'>
              <span>{e.street},{e.city},{e.state}</span>
              <span>{e.pinCode}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

