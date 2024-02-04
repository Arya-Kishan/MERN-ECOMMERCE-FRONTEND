import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, fetchSortedOrdersAsync, selectAllOrders, updateOrderAsync } from '../adminSlice'
import { PencilIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import filterIcon from '../../../app/images/filter.svg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function AdminOrders() {

  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)
  const [editOrder, setEditOrder] = useState(-1)

  const handleUpdateOrder = (status, id, order) => {

    const itemIdAndQuantity = order.itemId.map((item, i) => (
      { itemId: item._id, quantity: order.totalQuantity[i].quantity }
    ))

    let newOrder = { id: id, status: status, items: itemIdAndQuantity };
    console.log(newOrder);
    dispatch(updateOrderAsync(newOrder))
  }

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

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [])

  return (
    <div className='p-10'>

      {/* ORDERS FILTER WITH DATE */}
      <div className='w-full flex justify-between m-2'>
        <h1 className='flex items-center gap-1 text-xl md:text-4xl'> <ShoppingBagIcon className='w-4 h-4' /> ORDERS :</h1>
        <div>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-ful text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={filterIcon}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <li
                      onClick={e => {
                        dispatch(fetchSortedOrdersAsync('-1'))
                      }}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Latest to Oldest
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li
                      onClick={e => {
                        dispatch(fetchSortedOrdersAsync('1'))
                      }}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Oldest to latest
                    </li>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* ORDERS */}
      {orders &&
        <>
          <div className='flex flex-col gap-5'>
            {orders.map((order) => (
              <div className='w-full] flex flex-col p-4 bg-slate-100' key={order.AdminOrders_id}>

                <div className='flex flex-col  gap-5 w-full justify-between items-start lg:flex-row'>
                  {/* ORDER ITEMS */}
                  <div className='flex flex-col'>
                    {order.itemId.map((product, i) => (
                      <div key={product._id} className='mt-2'>

                        <div className='flex gap-2'>

                          <img className='w-20 h-20' src={product.thumbnail} alt="" />

                          <div>
                            <h2>{product.title}</h2>
                            <p className='text-gray-600'>$ {product.price}</p>
                            <p>Quantity : {order.totalQuantity[i]?.quantity}</p>
                          </div>


                        </div>


                      </div>
                    ))}
                  </div>

                  {/* ORDER ADDRESS */}
                  <div className='hidden md:flex'>
                    <h1 className='text-xl'>Address : </h1>
                    {order.selectedAddresses.map((address, i) => (
                      <div key={i}>
                        <p>{address.street},{address.city}</p>
                        <p>{address.state},{address.country}</p>
                        <p>{address.pinCode}</p>
                      </div>
                    ))}
                  </div>
                  {/* CLIENT INFO */}
                  <div className='hidden md:flex'>
                    <h1 className='text-xl flex items-center'><UserCircleIcon className='w-6 h-6 mr-1' />Client : </h1>
                    {order.selectedAddresses.map((address, i) => (
                      <div key={i}>
                        <p className='flex items-center gap-2'>{address.firstName}{address.lastName}</p>
                        <p>{address.email}</p>
                        <p>{address?.phone}7762883953</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* PAYMENT METHOD DELIVERED DATE */}
                <div className='flex flex-col w-full justify-between p-2 bg-slate-200 items-center lg:flex-row'>

                  <div className='flex justify-between w-full gap-2 m-2'>
                    <p>{dayjs(order.date).format('MMM DD, YYYY')}</p>

                    <p>{order.paymentMethod}</p>
                  </div>

                  <div className='flex justify-between w-full gap-2 m-2'>
                    <p>$ {order.totalAmount}</p>

                    {order._id !== editOrder &&
                      <div className={`flex ${colorChoose(order.status)} rounded-md items-center gap-3`}>
                        {order.status}
                        <PencilIcon onClick={e => setEditOrder(order._id)} className='w-4 h-4 cursor-pointer' />
                      </div>}

                    {order._id == editOrder && <select name="" id="" onChange={e => {
                      setEditOrder(-1);
                      handleUpdateOrder(e.target.value, order._id, order);
                    }}>
                      <option value={`${order.status}`}>{order.status}</option>
                      <option value="pending">pending</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                      <option value="dispatched">dispatched</option>
                    </select>}
                  </div>

                </div>


              </div>
            ))}
          </div>
        </>
      }

    </div>
  )
}
