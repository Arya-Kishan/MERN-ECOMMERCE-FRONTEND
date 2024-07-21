import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cards() {

    const navigate = useNavigate();

    return (
        <div>

            <div className='flex gap-5 w-full overflow-scroll p-10'>
                <img onClick={() => navigate('/infiniteScroll/mens-watches')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png'></img>
                <img onClick={() => navigate('/infiniteScroll/womens-dresses')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/tops/Girl%20Summer%20Dress/thumbnail.png'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shirts')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/thumbnail.png'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shoes')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png'></img>
                <img onClick={() => navigate('/infiniteScroll/womens-dresses')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src="https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/thumbnail.png"></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shirts')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/thumbnail.png'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-watches')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Series%204%20Gold/thumbnail.png'></img>
            </div>

            <div className='flex justify-end'>
                <button className='px-4 py-2 bg-gray-200 cursor-pointer rounded-md' onClick={() => navigate("/infiniteScroll/products")}>SEE ALL</button>
            </div>

        </div>
    )
}