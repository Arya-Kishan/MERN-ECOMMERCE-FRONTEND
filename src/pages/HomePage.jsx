import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Banner from './HomePage/Banner'
import Category from './Category'
import Brands from './HomePage/Brands'
import Footer from './HomePage/Footer'
import Support from './HomePage/Support'
import Cards from './HomePage/Cards'
import ProductListSecond from '../features/Product/components/ProductListSecond'

export default function HomePage() {
    return (
        <div>
            <Navbar>
                <Banner />
                <Category />
                <ProductListSecond></ProductListSecond>
                <Support />
                <Cards/>
                <Brands />
                <Footer />
            </Navbar>
        </div>
    )
}
