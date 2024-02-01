import React from 'react'
import apple from '../../assets/apple.png'
import dell from '../../assets/dell.png'
import health from '../../assets/health.png'
import ps4 from '../../assets/ps4.png'
import flipkar from '../../assets/flipkart.png'
import shopify from '../../assets/shopify.png'
import '../../App.css'

export default function Brands() {
    
    return (
        <div className='p-8 w-full overflow-hidden'>
            <div className='slider flex justify-around py-4 px-2'>
                <img className='w-12' src={shopify} alt="" srcSet="" />
                <img className='w-12' src={dell} alt="" srcSet="" />
                <img className='w-12' src={flipkar} alt="" srcSet="" />
                <img className='w-12' src={ps4} alt="" srcSet="" />
                <img className='w-12' src={health} alt="" srcSet="" />
                <img className='w-12' src={apple} alt="" srcSet="" />
            </div>
        </div>
    )
}
