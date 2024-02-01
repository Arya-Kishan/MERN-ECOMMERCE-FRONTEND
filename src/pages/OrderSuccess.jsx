import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { mailOrderReceiptAsync, selectOrders } from '../features/order/orderSlice'

export default function OrderSuccess() {

  const navigate = useNavigate()
  const { orderId } = useParams()

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='border-solid border-2 border-black-900 px-8 py-5 flex flex-col gap-5 items-center'>
        <span className='text-blue-600 font-bold'>ORDER SUCCESSFULLY PLACED</span>
        <h2 className='text-2xl'>ORDER NUMBER</h2>
        <h1 className='text-3xl'>#{orderId}</h1>
        <p>YOU CAN CHECK YOUR ORDER IN MY ACCOUNT - MY ORDER</p>
        <button onClick={() => navigate("/")} className='border-solid border-2 border-blue-600 bg-blue-600 rounded-md px-5 py-3 m-2'>GO BACK HOME</button>
      </div>
    </div>
  )
}
