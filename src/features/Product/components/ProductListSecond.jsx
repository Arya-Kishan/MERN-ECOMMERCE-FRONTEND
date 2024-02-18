import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrandsAsync, fetchAllCategoriessAsync, fetchAllProductsAsync, fetchFilteredProductsAsync, selectAllBrands, selectAllCategories, selectAllProducts } from '../ProductSlice';
import ProductCard1 from './ProductCard1';
import ProductCard2 from './ProductCard2';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Pagination, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { fetchTotalCountAsync, selecttotalEverthingCounts } from '../../../Admin/AdminProductList/adminSlice';

export default function ProductListSecond({ show }) {

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [paginationCount, setPaginationCount] = useState(0);
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    // GET THE COUNT OF PRODUCTS ORDERS AND USERS TOTAL
    const totalProductsCount = useSelector(selecttotalEverthingCounts);
    const categories = useSelector(selectAllCategories);
    const brands = useSelector(selectAllBrands);
    const [layout, setLayout] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // USED FOR SORTING RESPECT TO PRICE,RATING OR DISCOUNT
    const handleClose = (e) => {
        setAnchorEl(null);
        const filterData = data.map((e) => {
            return { ...e }
        })
        if (e.target.innerText == 'Discount') {
            filterData.sort((a, b) => a.discountPercentage - b.discountPercentage)
            setData(filterData)
        } else if (e.target.innerText == 'Rating') {
            filterData.sort((a, b) => a.rating - b.rating)
            setData(filterData)
        } else {
            filterData.sort((a, b) => a.price - b.price)
            setData(filterData)
        }
    };

    const handleFilter = (section, option) => {

        setPaginationCount(1)
        if (option == "brand" || option == "category") {
            return;
        } else {

            let filters1 = { [section]: option };
            dispatch(fetchFilteredProductsAsync(filters1));
        }
    }

    const handlePagination = (event, value) => {
        let page = +value;
        dispatch(fetchAllProductsAsync({ page }));
        setPage(value)
    }

    useEffect(() => {
        setData(products)
        if (totalProductsCount) {
            setPaginationCount(Math.ceil(totalProductsCount?.productsCount / 8))
        }
    }, [products,totalProductsCount])

    useEffect(() => {
        dispatch(fetchAllProductsAsync({ page }));
        dispatch(fetchAllCategoriessAsync());
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchTotalCountAsync());
    }, [])




    return (
        <div className='py-20 w-full'>
            {/* BUTTONS  */}
            <div className='w-full flex justify-between md:px-20'>

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

            {/*ADDING VERTICAL AND HORIZINTAL LAYOUT RESPECT TO STATE TRUE AND FALSE */}
            <div className='flex justify-center gap-4 flex-wrap w-full h-full p-4'>
                {layout && <>
                    {data && data.map((e, i) => (
                        <div key={e._id}>
                            <ProductCard2 product={e} />
                            {show == "admin" && <div onClick={() => navigate(`/admin/productForm/${e._id}`)} className='w-full bg-green-400 p-5 my-5 hover:bg-green-700 text-center cursor-pointer'>Edit Product</div>}
                        </div>
                    ))}
                </>}
                {!layout && <>
                    {data && data.map((e, i) => (
                        <div key={i}>
                            <ProductCard1 product={e} />
                            {show == "admin" && <div onClick={() => navigate(`/admin/productForm/${e._id}`)} className='w-full bg-green-400 p-5 my-5 hover:bg-green-700 text-center cursor-pointer'>Edit Product</div>}
                        </div>
                    ))}
                </>}
            </div>

            {/* PAGINATION */}
            <div>
                <Pagination count={paginationCount} page={page} onChange={handlePagination} />
            </div>

        </div>
    )
}
