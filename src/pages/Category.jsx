import React from 'react'
import phone from "../assets/phone.png"
import laptop from "../assets/laptop.png"
import watch from "../assets/watch.png"
import headphone from "../assets/headphone.png"
import glass from "../assets/glass.png"
import light from "../assets/light.png"
import sofa from "../assets/sofa.png"
import shoes from "../assets/shoes.png"
import dress from "../assets/dress.png"
import { useNavigate } from 'react-router-dom'

export default function Category() {

    const navigate = useNavigate()

    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 md:grid-cols-4 place-items-center gap-5 bg-gray-100 p-5'>

                <div onClick={() => navigate("/infiniteScroll/laptops")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Laptop</span>
                    <img className='w-10' src={laptop} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/smartphones")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Smatphone</span>
                    <img className='w-10' src={phone} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/sunglasses")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Glass</span>
                    <img className='w-10' src={glass} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/lighting")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Light</span>
                    <img className='w-10' src={light} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/furniture")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Sofa</span>
                    <img className='w-10 h-[40px]' src={sofa} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/mens-shoes")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Shoes</span>
                    <img className='w-10' src={shoes} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/mens-watches")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Watch</span>
                    <img className='w-10' src={watch} alt="" srcSet="" />
                </div>

                <div onClick={() => navigate("/infiniteScroll/womens-dresses")} className='flex items-center justify-center gap-10 p-2 cursor-pointer bg-white'>
                    <span className='text-[13px] md:2xl w-[60px]'>Cloth</span>
                    <img className='w-10' src={dress} alt="" srcSet="" />
                </div>

            </div>
        </div>
    )
}
