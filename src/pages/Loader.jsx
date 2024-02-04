import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import cart from '../assets/cart.png'

export default function Loader() {
    return (
        <div className='flex flex-col justify-center items-center gap-4 w-full h-[100vh]'>
            <img className='h-30 w-30' src={cart} alt="" srcSet="" />
            <div><CircularProgress /></div>
        </div>
    )
}
