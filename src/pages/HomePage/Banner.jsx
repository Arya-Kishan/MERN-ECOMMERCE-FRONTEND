import React from 'react'
import bannerImg from '../../assets/pic1.png'
import { useNavigate } from 'react-router-dom'

export default function Banner() {

    const navigate = useNavigate()

    return (
        <div className='relative bannerBg'>

            <div className='w-full h-[100vh] md:h-[80vh] grid grid-cols-1 md:grid-cols-2 p-2'>

                <div className='flex items-center justify-center'>

                    <div className='flex flex-col items-center md:items-start justify-center gap-5'>
                        <p className='text-2xl md:text-5xl lg:text-10xl'>Online Shopping</p>
                        <p className='text-1xl md:text-3xl lg:text-3xl'>Store full of Desire</p>
                        <p className='text-2xl bg-blue-600 rounded-md p-2 hover:bg-blue-800 hover:text-white cursor-pointer' onClick={() => navigate("/infiniteScroll/products")}>Explore</p>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-start md:items-start md:justify-center gap-5'><img className='w-[80%]' src={bannerImg} alt="" srcSet="" /></div>

            </div>


            <div className='circle1'></div>
            <div className='circle2'></div>

        </div>
    )
}
