import { Rating } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishlistAsync } from '../../wishlist/wishlistSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { addComapareItem } from '../../compare/compareSlice';

export default function ProductCard2({ product, component, wishlistItemId }) {

    const [change, setChange] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)

    const handleDetail = () => {
        navigate(`/detail/${product._id}`)
    }

    const handleWishlistAdd = () => {
        const newWishlist = { userId: user._id, itemId: product._id }
        dispatch(AddWishlistAsync(newWishlist));
    }

    return (
        <div className='flex gap-1 border-solid border-2 border-black-900 w-[95vw] lg:w-[45vw] hover:duration-200 hover:-translate-y-3 hover:bg-gray-300 mx-2 cursor-pointer' onClick={handleDetail}>

            <img className='w-20 md:w-40 md:p-10' src={product.thumbnail}></img>

            <div className='flex flex-col gap-6 justify-between w-full p-3'>

                <div className='flex justify-between'>
                    <div>
                        <p>{product.title}</p>
                        <p className='hidden md:flex'>{product.description}</p>
                    </div>

                    <div onClick={e => e.stopPropagation()} className='flex gap-4'>

                        <button onClick={(e) => {
                            setChange(true)
                            handleWishlistAdd()
                        }}>
                            {change ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteIcon style={{ color: "white", background: 'black', borderRadius: "50%", padding: '3px' }} />}
                        </button>

                        <button
                            className="cursor-pointer"
                            onClick={(e) => {
                                dispatch(addComapareItem(product))
                            }}>
                            <CompareArrowsIcon />
                        </button>

                    </div>

                </div>

                <p className='w-full flex justify-between'>
                    <span>$ {product.price}</span>
                    <span><Rating
                        name="simple-controlled"
                        value={product.rating}
                    /></span>
                </p>

            </div>

        </div>
    )
}
