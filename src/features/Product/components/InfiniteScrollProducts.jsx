import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard1 from './ProductCard1'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProductsAsync, selectAllBrands, selectAllCategories, selectAllProducts, selectProductStatus } from '../ProductSlice';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard2 from './ProductCard2';
import Loader from '../../../pages/Loader';


let a;
export default function InfiniteScrollProducts() {

    const [productsMain, setProductsMain] = useState(null)
    const [stop, setStop] = useState(true)
    const [layout, setLayout] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const categories = useSelector(selectAllCategories);
    const brands = useSelector(selectAllBrands);
    const productStatus = useSelector(selectProductStatus);
    const { category: categoryParam } = useParams();

    const open = Boolean(anchorEl);

    const fetchData1 = async () => {
        a = 1;
        const { data } = await axios.get(`https://my-mern-ecommerce.vercel.app/product?limit=8&page=1`)
        setProductsMain(data)
    }

    const fetchData2 = async () => {

        ++a;
        console.log(a);
        const { data } = await axios.get(`https://my-mern-ecommerce.vercel.app/product?limit=8&page=${a}`)
        if (data.length < 8) {
            setStop(false)
        }
        setProductsMain((prev) => ([...prev, ...data]))
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // USED FOR SORTING RESPECT TO PRICE,RATING OR DISCOUNT
    const handleClose = (e) => {
        setAnchorEl(null);
        const filterData = productsMain.map((e) => {
            return { ...e }
        })
        if (e.target.innerText == 'Discount') {
            filterData.sort((a, b) => a.discountPercentage - b.discountPercentage)
            setProductsMain(filterData)
        } else if (e.target.innerText == 'Rating') {
            filterData.sort((a, b) => a.rating - b.rating)
            setProductsMain(filterData)
        } else {
            filterData.sort((a, b) => a.price - b.price)
            setProductsMain(filterData)
        }
    };

    const handleFilter = (section, option) => {

        if (option == "brand" || option == "category") {
            return;
        } else {

            let filters1 = { [section]: option };
            console.log(filters1);
            dispatch(fetchFilteredProductsAsync(filters1));
        }
        setStop(false)
    }

    useEffect(() => {
        if (categoryParam == "products") {
            fetchData1()
            setStop(true)
        }
        if (categoryParam !== "products") {
            setProductsMain(null)
            console.log("mkaing call for category");
            dispatch(fetchFilteredProductsAsync({ category: categoryParam }));
            setStop(false)
        }
    }, [categoryParam])

    useEffect(() => {
        console.log("SETTING PRODUCTS TO STATE");
        setProductsMain(products)
    }, [products])

    return (
        <div>

            <div className='w-full flex justify-between md:px-20 fixed top-0 p-2 bg-white z-10'>

                {/* CATEGORIES AND BRANDS */}
                <div className='gap-2 hidden md:flex'>
                    <select className='cursor-pointer' onClick={(e) => handleFilter('category', e.target.value)}>
                        <option value="category">Category</option>
                        {categories && categories.map((e, i) => (<option value={e.value} key={i}>{e.label}</option>))}
                    </select>
                    <select className='cursor-pointer' onClick={(e) => handleFilter('brand', e.target.value)}>
                        <option value="brand">Brand</option>
                        {brands && brands.map((e, i) => (<option value={e.value} key={i}>{e.label.split(" ").slice(0, 2).join(" ")}</option>))}
                    </select>
                </div>

                {/* BUTTONS OF LAYOUT FILTER */}
                <div className='w-full md:w-[130px] flex items-center justify-between gap-2 px-10'>

                    <div className='flex gap-1'>
                        <span onClick={() => setLayout(true)}>
                            <Tooltip title="Horizonat Layout" ><MenuIcon /></Tooltip>
                        </span>

                        <span onClick={() => setLayout(false)}>
                            <Tooltip title="Vetical layout" ><MenuIcon className='rotate-90' /></Tooltip>
                        </span>
                    </div>

                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <FilterAltIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Price</MenuItem>
                            <MenuItem onClick={handleClose}>Rating</MenuItem>
                            <MenuItem onClick={handleClose}>Discount</MenuItem>
                        </Menu>
                    </div>

                </div>

            </div>

            <div className='mt-10 md:mt-20'>
                {productsMain &&
                    <InfiniteScroll
                        className='flex justify-center items-center flex-wrap gap-5 px-2 py-5'
                        dataLength={productsMain.length} //This is important field to render the next data
                        next={fetchData2}
                        hasMore={stop}
                        loader={<div className='w-full flex justify-center p-10'><CircularProgress /></div>}
                        endMessage={
                            <p className='w-full p-10 flex justify-center'>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {!layout ? productsMain.map((product, i) => (
                            <ProductCard1 product={product} key={i} />
                        )) : productsMain.map((product, i) => (
                            <ProductCard2 product={product} key={i} />
                        ))}
                    </InfiniteScroll>}
            </div>

        </div>
    )
}
