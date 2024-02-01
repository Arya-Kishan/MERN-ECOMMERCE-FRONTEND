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

  return (
    <div className='p-2'>
      {orders.length > 0 && <>
        {orders.map((order) => (
          <div key={order._id} className='flex flex-col mt-8 bg-slate-100'>

            {order.itemId.map((item, i) => (
              <div className='flex flex-col p-2 bg-slate' key={i}>

                <div className='flex'>
                  <div>
                    <img className='w-40 h-40' src={item.thumbnail} alt="" srcSet="" />
                  </div>

                  <div className='flex flex-col w-full justify-between p-2'>

                    <div className='flex justify-between'>
                      <span className='md:text-3xl'>{item.title}</span>
                      <span className='md:text-xl'>$ {item.price}</span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='md:text-xl'>{dayjs(order.date).format("DD/MM/YYYY")}</span>
                      <span className='md:text-xl'>qty : {order.totalQuantity[i].quantity}</span>
                    </div>

                  </div>
                </div>

              </div>
            ))}


            <div className='flex justify-between p-2'>
              <p>TotalAmount : $ {order.totalAmount}</p>
              <p>Method : {order.paymentMethod}</p>
              <span className='md:text-xl'>status : {order.status}</span>
            </div>

          </div>
        ))}
      </>}
    </div>
  )
}
