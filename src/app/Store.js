import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/Product/ProductSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/order/orderSlice'
import adminReducer from '../Admin/AdminProductList/adminSlice'
import wishListReducer from '../features/wishlist/wishlistSlice'
import compareReducer from '../features/compare/compareSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    admin: adminReducer,
    wishlist: wishListReducer,
    compare: compareReducer,
    search: searchReducer,
  },
})