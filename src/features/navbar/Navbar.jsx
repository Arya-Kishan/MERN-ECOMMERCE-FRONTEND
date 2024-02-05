import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrows from '@mui/icons-material/CompareArrows'
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signoutUserAsync } from '../auth/authSlice'
import { selectcartCount } from '../cart/cartSlice'
import logo from '../../assets/logo1.png'
import circle1 from '../../assets/circle1.png'
import { selectWishlistCount } from '../wishlist/wishlistSlice';
import { selectCompareCount } from '../compare/compareSlice';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar({ children }) {

    const navigate = useNavigate();
    const user = useSelector(selectLoggedInUser)
    const cartCount = useSelector(selectcartCount)
    const wishlistCount = useSelector(selectWishlistCount)
    const compareCount = useSelector(selectCompareCount)
    const dispatch = useDispatch()

    const handleNavigate = (e) => {
        navigate(`/cart/${user._id}`);
    }

    const handleNavigateWishlist = (e) => {
        navigate(`/wishlist`);
    }

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800 fixed w-full z-10">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <CloseIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center gap-2">
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                        <span className='text-2xl text-white'>Aryazon</span>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        {user.role == "admin" && <div className="flex space-x-4">
                                            <Link
                                                to="/admin/productList"><span className='text-xl bg-blue-500 p-2 rounded-md'>Admin</span></Link>
                                        </div>}
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">

                                    {/* WISHLIST */}
                                    <button
                                        onClick={(e) => (handleNavigateWishlist())}
                                        type="button"
                                        className="hidden md:flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <span className='relative'>
                                            <FavoriteIcon />
                                            <span className='absolute top-[-10px] right-[-10px]'>{wishlistCount}</span>
                                        </span>
                                    </button>

                                    {/* CART BITTON */}
                                    <button
                                        onClick={(e) => (handleNavigate(e, 'userId'))}
                                        type="button"
                                        className="hidden md:flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <span className='relative'>
                                            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                                            <span className='absolute top-[-10px] right-[-10px]'>{cartCount}</span>
                                        </span>
                                    </button>

                                    {/* COMPARE BUTTON  */}
                                    <button
                                        onClick={(e) => navigate("/compare")}
                                        type="button"
                                        className="hidden md:flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <span className='relative'>
                                            <CompareArrows />
                                            <span className='absolute top-[-10px] right-[-10px]'>{compareCount}</span>
                                        </span>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={circle1}
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
                                                        <Link
                                                            to={`/userProfile/${user._id}`}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            My Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/userOrder/${user._id}`}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            MyOrders
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <li
                                                            onClick={e => dispatch(signoutUserAsync())}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </li>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="w-full sm:hidden">
                            <div className="flex flex-col gap-1 
                            space-y-1 px-2 pb-3 pt-2">
                                {user.role == "admin" && <Link to={'/admin/productList'} className='w-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium'>Admin</Link>}
                                <Link to={'/wishlist'} className='w-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium'>Wishlist  <span className='text-gray-600'> - {wishlistCount}</span></Link>
                                <Link to={'/compare'} className='w-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium'>Compare  <span className='text-gray-600'> - {compareCount}</span></Link>
                                <Link to={`/cart/${user._id}`} className='w-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium'>Cart  <span className='text-gray-600'> - {cartCount}</span></Link>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <main>
                <div className="mx-auto w-full py-6 sm:px-2 lg:px-2 pt-[64px]">{children}</div>
            </main>

        </div >
    )
}
