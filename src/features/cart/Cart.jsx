import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItemAsync, fetchCartItemsAsync, selectCartItems, selectcartStatus, updateCartItemAsync } from './cartSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { selectLoggedInUser } from '../auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../pages/Loader'

export default function Cart() {

    const dispatch = useDispatch()
    const cart = useSelector(selectCartItems);
    const user = useSelector(selectLoggedInUser)
    const cartStatus = useSelector(selectcartStatus)
    const { userId } = useParams();
    const [total, SetTotal] = useState(0)
    const navigate = useNavigate()

    // UPDATING CART
    const handleUpdateCart = (e, cartId, cartItem, whatToDo) => {
        if (whatToDo == 'minus') {
            let newCart = { id: cartId, quantity: cartItem.quantity - 1 }

            dispatch(updateCartItemAsync(newCart));
        }
        if (whatToDo == 'plus') {
            let newCart = { id: cartId, quantity: cartItem.quantity + 1 }

            dispatch(updateCartItemAsync(newCart));
        }
    }

    // DELETING CART
    const handleDeleteCart = (id) => {
        dispatch(deleteCartItemAsync(id))
        toast("Cart Deleted")
    }

    // CALCULATING TOTAL PRICE
    useEffect(() => {
        if (cart?.length > 0) {
            let a = cart.map((e) => {
                return (e.itemId.price * e.quantity)
            })

            let b = a.reduce((a, b) => {
                return (a + b)
            })

            SetTotal(b)
        }
    }, [cart])


    // FETCHING CART ITEMS WITH USER ID
    useEffect(() => {
        dispatch(fetchCartItemsAsync(userId));
    }, [userId])

    if (cartStatus == "loader") {
        return (<Loader />);
    }


    return (
        <div className='p-2'>
            {(cart && cart.length > 0) ?
                <>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cart?.map((product) => (
                                    <li key={product._id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.itemId.thumbnail}
                                                alt={product.itemId.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={'#'}>{product.itemId.title}</a>
                                                    </h3>
                                                    <p className="ml-4">{product.itemId.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product.itemId.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500 flex flex-row gap-2">
                                                    <MinusIcon
                                                        className='w-3 h-3'
                                                        onClick={(e) => {
                                                            handleUpdateCart(e, product._id, product, 'minus')
                                                        }}>
                                                    </MinusIcon>
                                                    <span>{product.quantity}</span>
                                                    <PlusIcon
                                                        className='w-3 h-3'
                                                        onClick={(e) => {
                                                            handleUpdateCart(e, product._id, product, 'plus')
                                                        }}>
                                                    </PlusIcon>
                                                </p>

                                                <div className="flex">
                                                    <button
                                                        onClick={e => handleDeleteCart(product._id)}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link
                                to={`/order/${user._id}`}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link
                                    to={`/`}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </> : (
                    <div className='flex flex-col justify-center items-center gap-5 w-full h-[80vh]'>
                        <p>No Items in Cart</p>
                        <button onClick={e => navigate('/')} className='bg-blue-600 rounded-lg p-4'>Add Cart</button>
                    </div>
                )}
        </div>
    )
}
