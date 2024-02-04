import React, { useEffect } from 'react'
import ProductListSecond from '../../../features/Product/components/ProductListSecond'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTotalCountAsync, selectAllOrders, selecttotalEverthingCounts } from '../adminSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminProductList() {

  const dispatch = useDispatch();
  const totalCounts = useSelector(selecttotalEverthingCounts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTotalCountAsync());
  }, [])

  return (
    <div className='flex flex-col gap-5'>

      <h1 className='text-4xl w-full text-center p-4 text-red-700'>ADMIN</h1>

      {/* THREE CIRCLES SHOWING COUNTS OF ORDERS ,USERS AND PRODUCTS */}
      {totalCounts && <div className='w-full h-[20vh] flex justify-around items-center'>

        <a href='#scrollToProduct' className='w-[90px] h-[90px] md:w-[200px] md:h-[200px] rounded-full bg-green-200 flex flex-col gap-3 justify-center items-center cursor-pointer hover:bg-gray-200'>
          <p>Products</p>
          <p>{totalCounts.productsCount}</p>
        </a>

        <div onClick={() => navigate("/admin/users")} className='w-[90px] h-[90px] md:w-[200px] md:h-[200px] rounded-full bg-green-200 flex flex-col gap-3 justify-center items-center cursor-pointer hover:bg-gray-200'>
          <p>Users</p>
          <p>{totalCounts.usersCount}</p>
        </div>

        <div onClick={() => navigate("/admin/orders")} className='w-[90px] h-[90px] md:w-[200px] md:h-[200px] rounded-full bg-green-200 flex flex-col gap-3 justify-center items-center cursor-pointer hover:bg-gray-200'>
          <p>Orders</p>
          <p>{totalCounts.ordersCount}</p>
        </div>

      </div>}

      {/* BUTTONS TO ADD NEW PRODUCT OR CATEGORY */}
      <div className='flex justify-evenly'>
        <button className='bg-green-200 p-3' onClick={e => navigate("/admin/productForm/addNew")}>Add New Product</button>
        <button className='bg-green-200 p-3' onClick={e => navigate("/admin/category")}>Add New Category</button>
      </div>

      {/* PRODUCT LIST SIMILAR TO FRONTEND */}
      <div id='scrollToProduct'>
        <ProductListSecond show={"admin"} />
      </div>
    </div>
  )
}
