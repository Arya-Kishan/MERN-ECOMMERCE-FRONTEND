import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createProductReviewsAsync } from '../ProductSlice'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { selectLoggedInUser } from '../../auth/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProductReview({ productId, setWriteReview }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    const [value, setValue] = useState(2);
    const [file, setFile] = useState(null);

    const handleAddReview = (data, e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("reviewUser", user.name);
        formData.append("productId", productId);
        formData.append("reviewRating", value);
        formData.append("reviewMessage", data.reviewMessage);
        dispatch(createProductReviewsAsync(formData))
        setWriteReview(false)
    }

    return (
        <div>
            <form className="space-y-6" onSubmit={handleSubmit((data, e) => {
                handleAddReview(data, e);
            })}>

                <div>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="upload" className='cursor-pointer flex items-center gap-1'> <AccountCircleIcon className='h-5 w-5' />{file == null ? "Upload Image" : file?.name}</label>
                    <input type="file" id='upload' onChange={e => setFile(e.target.files[0])} className='hidden' />
                </div>

                <div>
                    <label htmlFor="reviewMessage" className="block text-sm font-medium leading-6 text-gray-900">
                        <Typography component="legend">Review</Typography>
                    </label>
                    <div className="mt-2">
                        <input
                            id="reviewMessage"
                            {...register("reviewMessage")}
                            type="text"
                            autoComplete="reviewMessage"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className='flex justify-around gap-4'>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Review
                    </button>
                    <button
                        onClick={() => setWriteReview(false)}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
