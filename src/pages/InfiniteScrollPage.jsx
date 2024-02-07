import React from 'react'
import Navbar from '../features/navbar/Navbar'
import InfiniteScrollProducts from '../features/Product/components/InfiniteScrollProducts'

export default function InfiniteScrollPage() {
    return (
        <div>
            <Navbar>
                <InfiniteScrollProducts />
            </Navbar>
        </div>
    )
}
