import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderAsync, fetchOrderAsync, selectOrders } from '../../order/orderSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import dayjs from 'dayjs'
import { Dialog } from '@mui/material';
import cart from '../../../assets/cart.png'

export default function UserOrders() {

  const orders = useSelector(selectOrders)
  const user = useSelector(selectLoggedInUser)
  const [orderId, setOrderId] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrderAsync(user._id))
  }, [])

  const colorChoose = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-purple-600';
      case 'delivered':
        return 'bg-green-200 text-purple-600';
      case 'cancelled':
        return 'bg-red-200 text-purple-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  }

  return (
    <div className='p-2'>

      <h1 className='text-4xl text-center font-bold'>YOUR ORDERS</h1>
      {orders.length > 0 ? <>
        {orders.map((order) => (
          <div key={order._id} className='flex flex-col mt-10 bg-slate-200 relative'>

            {order.itemId.map((item, i) => (
              <div className='flex flex-col p-2 bg-slate' key={i}>

                <div className='flex'>
                  <div>
                    <img className='w-10 h-10 md:w-20 md:h-20' src={item.thumbnail} alt="" srcSet="" />
                  </div>

                  <div className='flex flex-col w-full justify-between px-2'>

                    <div className='flex justify-between'>
                      <span className='md:text-2xl'>{item.title}</span>
                      <span className='md:text-xl'>$ {item.price}</span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='text-[14px] md:text-xl text-gray-400'>{dayjs(order.date).format("DD-MM-YYYY")}</span>
                      <span className='text-[14px] md:text-xl'>Qty : {order.totalQuantity[i].quantity}</span>
                    </div>

                  </div>
                </div>

              </div>
            ))}


            <div className='flex justify-between p-2'>
              <p>Total : $ {order.totalAmount}</p>
              <p>{order.paymentMethod}</p>
              <span className={`md:text-xl ${colorChoose(order.status)} p-1`}>{order.status}</span>
            </div>

            {order.status !== "delivered" && <div onClick={e => {
              setOrderId(order._id)
              setShowDialog(true)
            }}
              className='cursor-pointer bg-slate-200 rounded-sm p-2 absolute -top-7 right-0 text-red-600'>
              Cancel
            </div>}

          </div>
        ))}
      </> : "NO ORDERS"}

      <Dialog open={showDialog} onClose={e => setShowDialog(false)} >

        <div className='w-[80vw] md"w-[50vw] h-[30vh] flex flex-col justify-center items-center gap-5 bg-slate-200'>

          <p><img className='w-10 h-10' src={cart} alt="" srcSet="" /></p>

          <p className='text-center text-xl '>ARE YOU SURE TO CANCEL ORDER</p>

          <div className='flex justify-evenly gap-5'>

            <p onClick={e => setShowDialog(false)} className='cursor-pointer bg-red-600 p-2 rounded-md text-center w-[20vw]'>NO</p>

            {/* DELETING ORDER WITH ORDER ID WHICH IS SAVED IN (orderId) STATE */}
            <p onClick={e => {
              dispatch(deleteOrderAsync(orderId));
              setShowDialog(false)
            }}
              className='cursor-pointer bg-red-600 p-2 rounded-md text-center w-[20vw]'>
              YES
            </p>

          </div>

        </div>

      </Dialog>

    </div>
  )
}
