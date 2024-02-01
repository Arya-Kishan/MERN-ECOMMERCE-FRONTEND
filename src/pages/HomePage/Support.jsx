import React from 'react'
import offer from '../../assets/offer.png'
import card from '../../assets/card.png'
import shipping from '../../assets/shipping.png'
import gifts from '../../assets/gifts.png'

export default function Support() {
    return (
        <div>
            <div className='w-full grid grid-cols-2 md:grid-cols-4 px-3 py-6 place-items-center gap-4 bg-gray-100'>

                <div className='flex items-center gap-4'>
                    <img className='w-6' src={shipping} alt="" srcSet="" />
                    <div>
                        <p className='text-1xl lg:text-2xl'>Free Shipping</p>
                        <p className='text-[12px] lg:text-1xl'>Deliver on door above $500</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <img className='w-6' src={gifts} alt="" srcSet="" />
                    <div>
                        <p className='text-1xl lg:text-2xl'>Daily Surprice offers</p>
                        <p className='text-[12px] lg:text-1xl'>Save upto 20% off</p>
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-4'>
                    <img className='w-6' src={card} alt="" srcSet="" />
                    <div>
                        <p className='text-1xl lg:text-2xl'>Secure payments</p>
                        <p className='text-[12px] lg:text-1xl'>100% protective payments</p>
                    </div>
                </div>

                <div className=' hidden md:flex items-center gap-4'>
                    <img className='w-6' src={offer} alt="" srcSet="" />
                    <div>
                        <p className='text-1xl lg:text-2xl'>Affordable Price</p>
                        <p className='text-[12px] lg:text-1xl'>Get factory direct proce</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
