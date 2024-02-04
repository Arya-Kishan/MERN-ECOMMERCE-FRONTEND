import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearComapareItem, deleteComapareItem, selectCompareCount, selectCompareItems } from './compareSlice'
import { useNavigate } from 'react-router-dom'

export default function Compare() {

    const dispatch = useDispatch()
    const compareItems = useSelector(selectCompareItems)
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteComapareItem(id))
    }

    const arr = ["Image", "Brand", "Discount", "Rating", "Price"]

    return (
        <div className='flex flex-col justify-center items-center p-5'>
            <p className='text-4xl text-center my-5'>Compare Products</p>

            {compareItems.length > 0 ? <>
                <table>
                    <thead className='hidden md:flex'>
                        <tr>
                            <th>Image</th>
                            <th className='tdSmall'>Brand</th>
                            <th>Discount</th>
                            <th>Rating</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {compareItems.map((e, i) => (
                        <tbody onClick={() => dispatch(deleteComapareItem(i))} key={i}>
                            <tr>
                                <td><img className='w-10 h-10' src={e.thumbnail} alt="" srcSet="" /></td>
                                <td className='tdSmall'>{e.brand}</td>
                                <td>{Math.round(e.discountPercentage * 10) / 10} %</td>
                                <td>{Math.round(e.rating * 10) / 10}</td>
                                <td>$ {e.price}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                <div className='fixed bottom-10 right-10'><button onClick={() => dispatch(clearComapareItem())} className='bg-blue-600 rounded-lg p-4'>Clear</button></div>
            </>
                :
                <div className='flex flex-col gap-5'>
                    <p>No Products To Comapre Please Add Product</p>
                    <button onClick={e => navigate('/')} className='bg-blue-600 rounded-lg p-4'>Home</button>
                </div>}

        </div>
    )
}
