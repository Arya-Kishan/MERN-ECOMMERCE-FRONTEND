import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRelatedProductsAsync, selectDetails, selectrelatedProducts } from '../ProductSlice'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom'

export default function RelatedProducts({ id }) {

    const dispatch = useDispatch()
    const productDetails = useSelector(selectDetails)
    const relatedProducts = useSelector(selectrelatedProducts);
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    const handleDetail = (e, id) => {
        setData(null)
        navigate(`/detail/${id}`)
    }



    useEffect(() => {
        if (productDetails) {
            dispatch(fetchRelatedProductsAsync(productDetails?.category))
        }
    }, [productDetails])

    useEffect(() => {
        if (relatedProducts) {
            const producs = relatedProducts.filter((e) => (
                id !== e._id
            ))
            setData(producs)
        }
    }, [relatedProducts])

    return (
        <div>
            {relatedProducts && <div className="bg-white">
                <div className="mx-auto max-w-2xl px-2 py-0 sm:px-2 sm:py-0 lg:max-w-7xl lg:px-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Related Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-3">
                        {data && data.length > 1 ? data?.map((product) => (
                            <div onClick={e => handleDetail(e, product._id)} key={product._id} className="group relative">

                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <p>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </p>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.brand}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mt-1 text-sm text-gray-500">$ {product.price}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 flex"><StarIcon className='w-4 h-4' /> {product.rating}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        )) : "---- NO RELATED PRODUCTS ----"}
                    </div>
                </div>
            </div>}
        </div>
    )
}
