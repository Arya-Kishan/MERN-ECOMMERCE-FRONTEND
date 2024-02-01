import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cards() {

    const navigate = useNavigate();

    return (
        <div>

            <div className='flex gap-5 w-full overflow-scroll p-10'>
                <img onClick={() => navigate('/infiniteScroll/mens-watches')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/68/thumbnail.webp'></img>
                <img onClick={() => navigate('/infiniteScroll/womens-dresses')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/41/1.jpg'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shirts')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/55/thumbnail.jpg'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shoes')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/60/thumbnail.jpg     '></img>
                <img onClick={() => navigate('/infiniteScroll/womens-dresses')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/39/1.jpg'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-shirts')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/52/3.jpg'></img>
                <img onClick={() => navigate('/infiniteScroll/mens-watches')} className='w-40 md:w-80 p-10 border-solid border-2 border-black-400' src='https://cdn.dummyjson.com/product-images/63/thumbnail.webp'></img>
            </div>

            <div className='flex justify-end'>
                <button className='px-4 py-2 bg-gray-200 cursor-pointer rounded-md' onClick={() => navigate("/infiniteScroll/products")}>SEE ALL</button>
            </div>

        </div>
    )
}