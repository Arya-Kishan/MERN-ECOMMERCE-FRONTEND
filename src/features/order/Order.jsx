import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItemsAsync, selectCartItems } from '../cart/cartSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser, updateUserAddressesAsync } from '../auth/authSlice'
import { AddOrderAsync, deleteAllUserCartItemAsync, mailOrderReceiptAsync, selectOrderStatus, selectOrders, setOrderStatus } from './orderSlice'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js';

export default function Order() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [paymentMethod, setPaymentMethod] = useState("")
    const [userAddress, setUserAdress] = useState("")
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(selectCartItems)
    const user = useSelector(selectLoggedInUser)
    const orderStatus = useSelector(selectOrderStatus)
    const orderAdded = useSelector(selectOrders)
    const { userId } = useParams()
    const navigate = useNavigate()




    const handleAddAddress = (data, e) => {
        e.preventDefault();
        let newAddress = { id: userId, addresses: [...user.addresses, data] }
        dispatch(updateUserAddressesAsync(newAddress))
    }

    const handleOrder = (cart) => {

        // GETTTTING products ID
        let itemsId = cart.map((e) => (
            e.itemId._id
        ))

        let totalQuantity = cart.map((e) => (
            { quantity: e.quantity }
        ))

        // TotalAmount
        let total = 0;
        if (cart?.length > 0) {
            let a = cart.map((e) => {
                return (e.itemId.price * e.quantity)
            })

            total = a.reduce((a, b) => {
                return (a + b)
            })
        }

        if (paymentMethod == '' || userAddress == '') {
            toast("PLEASE SELECT BOTH PAYMENT METHOD AND ADDRESS")
        } else {
            let order = { userId: user._id, itemId: itemsId, paymentMethod: paymentMethod, selectedAddresses: userAddress, status: "pending", totalAmount: total, totalQuantity: totalQuantity }
            dispatch(AddOrderAsync(order));
            dispatch(deleteAllUserCartItemAsync(userId));
            if (paymentMethod == 'card') {
                handlePayment()
            }
        }

    }

    const handlePayment = async () => {
        const stripe = await loadStripe("pk_test_51OTSOaSCLk89VVV2y65ICM1KafKVLbOIhdp06xHCYFST0x3lQGymFiCjyl2Ji6qOcmmugvwPipgsLxtF6bDOhcNM00Msw33mYG")


        let res = await fetch("https://my-mern-ecommerce.vercel.app//create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(cart)
        })

        const session = await res.json();
        console.log(session);

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

    }


    useEffect(() => {
        dispatch(fetchCartItemsAsync(userId));
    }, [userId])

    useEffect(() => {
        if (orderStatus == "Placed") {
            dispatch(setOrderStatus())
            console.log("navigating to order success");
            dispatch(mailOrderReceiptAsync(orderAdded))
            navigate(`/orderSuccess/${orderAdded._id}`)
        }
    }, [orderStatus])

    return (
        <div>
            <div className='grid grid-cols-[1fr] md:grid-cols-[1.3fr,0.7fr]'>
                <form className='p-5' onSubmit={handleSubmit((data, e) => {
                    handleAddAddress(data, e);
                    setShowForm(false)
                })}>
                    {showForm && <>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Add Address</h2>

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
                            <h2 className="font-semibold leading-7 text-gray-900 text-2xl"> Choose Address</h2>
                            <div onClick={e => setShowForm(true)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New</div>
                        </div>
                        <ul role="list" >
                            {user.addresses.map((address, i) => (
                                <li key={i} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 m-4">
                                    <div className="flex min-w-0 gap-x-4">
                                        <input
                                            name='address'
                                            onChange={e => setUserAdress(address)}
                                            type="radio"
                                            value={i}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street},{address.city}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.country}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">Pincode : {address.pinCode}</p>
                                        <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="cash"
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        value={"cash"}
                                        name="payments"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cash
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="card"
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        value={"card"}
                                        name="payments"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                        Card
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </form>
                <div>
                    {cart &&
                        <>
                            <div className="mt-8 p-2">
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
                                                            <p className="ml-4">$ {product.itemId.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.itemId.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500 flex flex-row gap-2 uppercase">
                                                            {product.itemId.category}
                                                        </p>

                                                        <div className="flex">
                                                            Quantity : {product.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button onClick={e => handleOrder(cart)} className=" w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6">Order</button>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}