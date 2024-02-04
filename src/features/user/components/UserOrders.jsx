import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderAsync, selectOrders } from '../../order/orderSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import dayjs from 'dayjs'

export default function UserOrders() {

  const orders = useSelector(selectOrders)
  const user = useSelector(selectLoggedInUser)
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
      {orders.length > 0 && <>
        {orders.map((order) => (
          <div key={order._id} className='flex flex-col mt-8 bg-slate-200'>

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

          </div>
        ))}
      </>}
    </div>
  )
}
