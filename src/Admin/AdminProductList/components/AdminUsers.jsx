import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAsync, fetchAllUsersAsync, selectAllUsers, updateUserRoleAsync } from '../adminSlice'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { Dialog } from '@mui/material';

export default function AdminUsers() {

  const [showAddress, setShowAddress] = useState(null)
  const [showRole, setShowRole] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  // SAVED USERID IN BELOW STATE TO DELETE BECOZ DIALOG ELEMENT IS OUT OF MAP
  const [userId, setUserId] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const handleUserRole = (e, userId) => {
    console.log(e.target.value, userId);
    if (e.target.value !== "choose") {
      dispatch(updateUserRoleAsync({ id: userId, role: e.target.value }));
    }
    setShowRole(null)
  }

  const handleDeleteUser = (userId) => {
    setShowDialog(true)
    setUserId(userId)
  }

  useEffect(() => {
    dispatch(fetchAllUsersAsync())
  }, [])

  return (
    <div>
      <h1 className='text-5xl text-center'>Users</h1>

      <div className='flex flex-col justify-center items-center gap-10 p-2'>

        {users && users.map((user) => (
          <div key={user._id} className={`relative w-[80%] flex flex-col gap-5 justify-between bg-${user.role == "admin" ? "green" : "slate"}-200`}>

            {user.role == "admin" && <StarBorderPurple500Icon className='absolute -top-3 left-0 w-4 h-4 stroke-yellow-400' />}

            {/* USER INFO */}
            <div className='w-full flex justify-between px-5 py-5 relative'>

              <p className='flex gap-1 items-center'><AccountCircleIcon className='w-4 h-4' />{user.name}</p>

              <p hidden md:flex>{user.email}</p>

              <div className='hidden md:flex' onClick={e => setShowAddress(user._id)} >
                {(showAddress == user._id) ?
                  <p onClick={e => {
                    e.stopPropagation()
                    setShowAddress(null)
                  }}>
                    <span className='flex items-center gap-2'><VisibilityOffIcon className='w-4 h-4' />Hide Address</span>
                  </p>
                  :
                  <span className='flex items-center gap-2'><VisibilityIcon className='w-4 h-4' />Show Address</span>}
              </div>

              <div className='flex items-center gap-1'>
                {(showRole !== user._id) && <div className='flex items-center gap-2'>{user.role}<button onClick={e => setShowRole(user._id)}><EditIcon className='w-4 h-4' /></button></div>}
                {(showRole == user._id) && <select onChange={e => handleUserRole(e, user._id)}>
                  <option value="choose">CHOOSE ROLE</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>}
              </div>

              {user.role == "user" && <div onClick={e => handleDeleteUser(user._id)} className='absolute -top-7 right-0 bg-slate-200 p-1 rounded-sm cursor-pointer'>Delete</div>}

            </div>

            {/* ADDRESSES */}
            {(showAddress == user._id) && <div className='hidden md:flex w-full justify-between px-5 py-5'>{user.addresses.map((address, i) => (

              <div key={i} className='flex flex-col bg-white p-5 rounded-lg'>
                <div className='flex'>
                  <p>{address.city},</p>
                  <p>{address.street},</p>
                  <p>{address.pinCode}</p>
                </div>
                <div className='flex'>
                  <p>{address.state},</p>
                  <p className='text-green-400'>{address.country}</p>
                </div>
              </div>

            ))}</div>}

          </div>
        ))}

      </div>

      <Dialog open={showDialog} onClose={e => setShowDialog(false)}>
        <div className='w-[50vh] h=[30vh] flex flex-col gap-5 p-5 bg-gray-300'>
          <p className='text-center text-xl'>Are You Sure !</p>
          <div className='flex justify-evenly'>
            <p className='bg-red-500 p-2 rounded-md cursor-pointer' onClick={e => setShowDialog(false)}>Cancel</p>
            <p className='bg-red-500 p-2 rounded-md cursor-pointer' onClick={e => {
              setShowDialog(false)
              dispatch(deleteUserAsync(userId))
            }}>Delete</p>
          </div>
        </div>
      </Dialog>

    </div>
  )
}
