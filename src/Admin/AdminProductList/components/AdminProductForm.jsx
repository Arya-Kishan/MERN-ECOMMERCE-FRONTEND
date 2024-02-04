import React, { useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchProductDetailAsync, selectAllBrands, selectAllCategories, selectDetails, updateProductByIdAsync } from '../../../features/Product/ProductSlice'
import { useForm } from 'react-hook-form'
import { AddProductAsync } from '../adminSlice'

export default function AdminProductForm() {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    const { productId } = useParams()
    console.log(productId);
    const dispatch = useDispatch()
    const product = useSelector(selectDetails)
    const brands = useSelector(selectAllBrands);
    const categories = useSelector(selectAllCategories);

    const handleUpdateProduct = (data) => {
        if (productId !== 'addNew') {
            let images = [data.image1, data.image2, data.image3, data.image4]
            let newData = { ...data, images: images };
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            console.log(newData);

            // dispatch(updateProductByIdAsync({ id: productId, products: newData }));
        } else {
            console.log(data);
            let formData = new FormData();
            formData.append("title", data.title)
            formData.append("brand", data.brand)
            formData.append("category", data.category)
            formData.append("description", data.description)
            formData.append("price", data.price)
            formData.append("stock", data.stock)
            formData.append("rating", data.rating)
            formData.append("thumbnail", [...data.thumbnail][0])
            formData.append("image1", [...data.image1][0])
            formData.append("image2", [...data.image2][0])
            formData.append("image3", [...data.image3][0])
            console.log(Object.fromEntries(formData));
            dispatch(AddProductAsync(formData))
        }
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProductAsync(productId));
    }

    useEffect(() => {
        if (productId !== 'addNew') {
            dispatch(fetchProductDetailAsync(productId));
        }
    }, [productId])

    useEffect(() => {
        if (productId !== 'addNew' && product) {
            setValue("title", product.title)
            setValue("brand", product.brand)
            setValue("category", product.category)
            setValue("description", product.description)
            setValue("price", product.price)
            setValue("stock", product.stock)
            setValue("rating", product.rating)
            setValue("thumbnail", product.thumbnail)
            setValue("image1", product?.images[0])
            setValue("image2", product?.images[1])
            setValue("image3", product?.images[2])
            setValue("image4", product?.images[3])
            setValue("image5", product?.images[4])
        }
    }, [productId, product])


    return (
        <div className='p-10 bg-slate-300'>
            {/* FORM TO UPDATE PRODUCT */}
            {(productId !== 'addNew' && product) && <>
                <form className='p-5' onSubmit={handleSubmit((data) => {
                    handleUpdateProduct(data);
                })}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">EDIT PRODUCT :</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                {...register("title")}
                                                id="title"
                                                autoComplete="title"
                                                className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="janesmith"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            {...register("description")}
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your Product.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="thumbnails" className="block text-sm font-medium leading-6 text-gray-900">
                                        Thumbnail
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("thumbnail")}
                                            id="thumbnail"
                                            autoComplete="thumbnail"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className='col-span-full'>
                                    <h1>MORE IMAGES</h1>

                                    <div className="col-span-full">
                                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 1
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image1")}
                                                id="image1"
                                                autoComplete="image1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 2
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image2")}
                                                id="image2"
                                                autoComplete="image2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 3
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image3")}
                                                id="image3"
                                                autoComplete="image3"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 4
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image4")}
                                                id="image4"
                                                autoComplete="image4"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                        Category
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("category")}
                                            id="category"
                                            list='categoryList'
                                            autoComplete="category"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <datalist id='categoryList'>
                                            {categories.map((e) => <option value={e.value} key={e.value}>{e.label}</option>)}
                                        </datalist>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                        Brand
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("brand")}
                                            id="brand"
                                            list='brandList'
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <datalist id='brandList'>
                                            {brands.map((e) => <option value={e.value} key={e.value}>{e.label}</option>)}
                                        </datalist>
                                    </div>
                                </div>

                                {/* <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div> */}


                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("price")}
                                            id="price"
                                            autoComplete="price"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                        Rating
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("rating")}
                                            id="rating"
                                            autoComplete="rating"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                        Stock
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("stock")}
                                            id="stocke"
                                            autoComplete="stock"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Back
                        </button>
                        {(productId == 'addNew') &&
                            <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Add
                            </button>
                        }
                        {(productId !== 'addNew') &&
                            <>
                                <button onClick={handleDeleteProduct} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Delete
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                            </>}
                    </div>
                </form>
            </>}
            {/* FORM TO ADD NEW PRODUCT */}
            {(productId == 'addNew') && <>
                <form className='p-5' onSubmit={handleSubmit((data) => {
                    handleUpdateProduct(data);
                })}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">EDIT PRODUCT :</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                {...register("title")}
                                                id="title"
                                                autoComplete="title"
                                                className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="janesmith"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            {...register("description")}
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your Product.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="thumbnails" className="block text-sm font-medium leading-6 text-gray-900">
                                        Thumbnail
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="file"
                                            {...register("thumbnail")}
                                            id="thumbnail"
                                            autoComplete="thumbnail"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className='col-span-full'>
                                    <h1>MORE IMAGES</h1>

                                    <div className="col-span-full">
                                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 1
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                {...register("image1")}
                                                id="image1"
                                                autoComplete="image1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 2
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                {...register("image2")}
                                                id="image2"
                                                autoComplete="image2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 3
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                {...register("image3")}
                                                id="image3"
                                                autoComplete="image3"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                        Category
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("category")}
                                            id="category"
                                            list='categoryList'
                                            autoComplete="category"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <datalist id='categoryList'>
                                            {categories.map((e) => <option value={e.value} key={e.value}>{e.label}</option>)}
                                        </datalist>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                        Brand
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("brand")}
                                            id="brand"
                                            list='brandList'
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <datalist id='brandList'>
                                            {brands.map((e) => <option value={e.value}>{e.label}</option>)}
                                        </datalist>
                                    </div>
                                </div>

                                {/* <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div> */}


                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("price")}
                                            id="price"
                                            autoComplete="price"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                        Rating
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("rating")}
                                            id="rating"
                                            autoComplete="rating"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                        Stock
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("stock")}
                                            id="stocke"
                                            autoComplete="stock"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Back
                        </button>
                        {(productId == 'addNew') &&
                            <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Add
                            </button>
                        }
                        {(productId !== 'addNew') &&
                            <>
                                <button onClick={handleDeleteProduct} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Delete
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                            </>}
                    </div>
                </form>
            </>}

        </div>
    )
}
