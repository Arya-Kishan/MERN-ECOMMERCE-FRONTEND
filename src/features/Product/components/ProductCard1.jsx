import { Rating } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishlistAsync, deleteWishlistAsync } from '../../wishlist/wishlistSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { addComapareItem } from '../../compare/compareSlice';

export default function ProductCard1({ product, component, wishlistItemId }) {

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

  const handleWishlistDelete = (wishlistItemId) => {
    dispatch(deleteWishlistAsync(wishlistItemId))
  }

  return (
    <div className='boxShadow hover:duration-200 hover:-translate-y-3 '>
      <div className='flex flex-col items-center border-solid border-2 border-black-900 w-[40vw] h-[200px] md:w-[300px] md:h-[400px] relative' onClick={handleDetail}>

        <div className='absolute top-1 right-1 flex flex-col gap-1' onClick={e => e.stopPropagation()}>

          <button onClick={(e) => {
            setChange(true)
            handleWishlistAdd()
          }}>
            {component == 'wishlist' ? "" : change ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteIcon />}
          </button>

          <button onClick={() => handleWishlistDelete(wishlistItemId)}>
            {component == "wishlist" && <CloseIcon />}
          </button>

          <button className="cursor-pointer" onClick={(e) => {
            dispatch(addComapareItem(product))
          }}><CompareArrowsIcon /></button>

        </div>

        <img className='w-[200px] h-[110px] md:w-[300px] md:h-[170px]' src={product.thumbnail}></img>

        <div className='w-full flex flex-col justify-between h-full p-2'>

          <div className='text-start'>
            <p className='text-[14px] md:text-xl'>{product.title.split(" ").slice(0,2).join(" ")}</p>
            <p className='hidden md:flex text-gray-400'>{product.description}</p>
          </div>

          <p className='w-full flex gap-5 items-center justify-between'>
            <span className='text-[10px] md:text-xl'>${product.price}</span>
            <span>
              <Rating
                name="simple-controlled"
                value={product.rating}
                style={{fontSize:"12px"}}
              />
            </span>
          </p>

        </div>

      </div>
    </div>
  )
}
