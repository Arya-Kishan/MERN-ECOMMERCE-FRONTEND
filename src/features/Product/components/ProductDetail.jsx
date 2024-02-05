import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetailAsync, fetchProductReviewsByIdAsync, selectDetailStatus, selectDetails, selectReviews } from '../ProductSlice'
import { AddCartItemAsync, defaultCartStatus, selectcartStatus } from '../../cart/cartSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import { toast } from 'react-toastify';
import dayjs from 'dayjs'
import ProductReview from './ProductReview'
import { Rating } from '@mui/material'
import RelatedProducts from './RelatedProducts'
import Loader from '../../../pages/Loader';


const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {

    const { id } = useParams();
    const [writeReview, setWriteReview] = useState(false)
    const productDetails = useSelector(selectDetails);
    const user = useSelector(selectLoggedInUser);
    const cartStatus = useSelector(selectcartStatus);
    const detailStatus = useSelector(selectDetailStatus)
    const reviews = useSelector(selectReviews);
    const dispatch = useDispatch();

    const handleAddCart = (e, productId) => {
        e.preventDefault();
        dispatch(AddCartItemAsync({ name: user.name, userId: user._id, itemId: productId, quantity: 1 }))
    }

    const handleAverageRating = () => {

        const ratingArr = reviews.map((e) => (e.reviewRating))
        const average = ratingArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratingArr.length;
        return Math.round(average);
    }

    useEffect(() => {
        dispatch(fetchProductDetailAsync(id))
        dispatch(fetchProductReviewsByIdAsync(id))
        scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        if (cartStatus == 'Success') {
            toast.success("Cart Added")
        } else if (cartStatus == 'Fail') {
            toast.error("Cart Not Added")
        }
        dispatch(defaultCartStatus())
    }, [cartStatus])


    if (detailStatus == "loading") {
        return (<Loader />);
    }

    return (
        <div>
            {productDetails &&
                <div className="bg-white">

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={productDetails.images[2]}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={productDetails.images[0]}
                                    alt={productDetails.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={productDetails.images[1]}
                                    alt={productDetails.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg border-solid border-2 flex items-center justify-center">
                            <img
                                src={productDetails.thumbnail}
                                alt={productDetails.title}
                                className="w-80 h-80 md:h-full md:w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productDetails.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">$ {productDetails.price}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    {reviews.length > 0 ? <Rating
                                        name="simple-controlled"
                                        value={handleAverageRating()}
                                    /> : <Rating
                                        name="simple-controlled"
                                        value={productDetails.rating}
                                    />}
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    {reviews.length} reviews
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Sizes */}
                                <button
                                    onClick={e => handleAddCart(e, productDetails._id)}
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to Cart
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-6 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{productDetails.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="mt-4">
                                    Brand : {productDetails.brand}
                                </div>
                                <div className="mt-4">
                                    Category : {productDetails.category}
                                </div>
                                <div className="mt-4">
                                    Stock : {productDetails.stock}
                                </div>
                            </div>

                        </div>
                        {/* REVIEWS SECTION */}
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                            <div className='flex items-center justify-between'>
                                <p className='text-2xl'>REVIEWS</p>
                                <p onClick={() => setWriteReview(true)} className='text-2xl cursor-pointer'><AddIcon className='h-8 w-8' /></p>
                            </div>

                            {writeReview && <ProductReview productId={id} setWriteReview={setWriteReview} />}

                            {reviews.length > 0 ? (<>
                                {reviews.map((e) => (
                                    <div className='mt-8 flex flex-col gap-4' key={e._id}>
                                        <div className='flex justify-between'>
                                            <h3 className="flex items-center gap-1"><AccountCircleIcon className='w-5 h-5' />{e.reviewUser}</h3>
                                            <p className="text-base text-gray-900">{dayjs(e.reviewDate).format("DD/MM/YYYY")}</p>
                                        </div>

                                        <div className='flex flex-col gap-2 ml-5'>
                                            <span>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={e.reviewRating}
                                                />
                                            </span>
                                            <span>{e.reviewMessage}</span>
                                        </div>

                                        <div>
                                            {e.reviewImage?.startsWith("http") ? <img className='h-40 w-40' src={e.reviewImage} alt="" srcSet="" /> : ""}
                                        </div>
                                    </div>
                                ))}
                            </>) : (<h1>No Review</h1>)}

                        </div>

                    </div>
                </div>}

            {productDetails && <RelatedProducts id={id} />}
        </div>
    )
}
