import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser } from '../auth/authSlice'
import { fetchWishlistAsync, selectWishlist, selectWishlistCount } from './wishlistSlice'
import ProductCard1 from '../Product/components/ProductCard1'
import { useNavigate } from 'react-router-dom'

export default function Wishlist() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const wishlist = useSelector(selectWishlist)
  const navigate = useNavigate()
  console.log(wishlist);

  useEffect(() => {
    dispatch(fetchWishlistAsync(user._id))
  }, [])

  return (
    <div className='mt-4'>
      <h1 className='text-4xl text-center'>WISHLIST</h1>
      <div className='flex gap-8 items-center justify-center flex-wrap p-4'>
        {wishlist?.length > 0 ? wishlist.map((e) => <ProductCard1 product={e.itemId} component={"wishlist"} wishlistItemId={e._id} key={e._id} />)
          :
          <div className='flex flex-col justify-center items-center gap-5 w-full h-[80vh]'>
            <p>No Products in Wishhlist</p>
            <button onClick={e => navigate('/')} className='bg-blue-600 rounded-lg p-4'>Home</button>
          </div>
        }
      </div>
    </div>
  )
}
