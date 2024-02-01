import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBrandsAsync, fetchAllCategoriessAsync, selectAllBrands, selectAllCategories } from '../../../features/Product/ProductSlice'
import { useForm } from 'react-hook-form'
import { AddCategoryAsync } from '../adminSlice'

export default function AdminCategory() {

    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)
    const brands = useSelector(selectAllBrands)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    const handleAddCategory = (data) => {
        dispatch(AddCategoryAsync(data))
    }

    useEffect(() => {
        dispatch(fetchAllCategoriessAsync())
        dispatch(fetchAllBrandsAsync())
    }, [])

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-2xl '>Availbale Categories :</h1>
                <div className='flex flex-col flex-wrap w-full h-[50vh]'>
                    {
                        categories.map((category, i) => (
                            <div key={i} className='m-3'>
                                <span className='pr-2'>{i + 1}</span>
                                <span>{category.value}</span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <form onSubmit={handleSubmit((data) => {
                        handleAddCategory({ value: data.category, label: data.category, checked: false });
                    })} className='flex justify-start items-end gap-5 mt-5'>
                        <div className="sm:col-span-4">
                            <label htmlFor="category" className="block text-lg font-medium leading-6 text-gray-900">
                                Add New Category
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        {...register("category")}
                                        id="category"
                                        autoComplete="category"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
