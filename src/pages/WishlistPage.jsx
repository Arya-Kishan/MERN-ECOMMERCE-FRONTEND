import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Wishlist from '../features/wishlist/Wishlist'

export default function WishlistPage() {
    return (
        <div>
            <Navbar>
                <Wishlist></Wishlist>
            </Navbar>
        </div>
    )
}
