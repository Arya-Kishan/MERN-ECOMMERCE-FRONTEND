import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedPage from './pages/ProtectedPage';
import ProtectedAdminPage from './pages/ProtectedAdminPage';
import { fetchCartItemsAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './pages/Loader';
import AdminUsers from './Admin/AdminProductList/components/AdminUsers';
import InfiniteScrollPage from './pages/InfiniteScrollPage';
import Practice from './pages/Practice';
import axios from 'axios';
const WishlistPage = lazy(() => (import('./pages/WishlistPage')))
const ComparePage = lazy(() => (import('./pages/ComparePage')))
const ProductDetailPage = lazy(() => (import('./pages/ProductDetailPage')))
const CartPage = lazy(() => (import('./pages/CartPage')))
const HomePage = lazy(() => (import('./pages/HomePage')))
const OrdersPage = lazy(() => (import('./pages/OrdersPage')))
const UserOrdersPage = lazy(() => (import('./pages/UserOrdersPage')))
const UserProfilePage = lazy(() => (import('./pages/UserProfilePage')))
const AdminProductList = lazy(() => (import('./Admin/AdminProductList/components/AdminProductList')))
const AdminProductForm = lazy(() => (import('./Admin/AdminProductList/components/AdminProductForm')))
const AdminOrders = lazy(() => (import('./Admin/AdminProductList/components/AdminOrders')))
const AdminCategory = lazy(() => (import('./Admin/AdminProductList/components/AdminCategory')))
const OrderSuccess = lazy(() => (import('./pages/OrderSuccess')))
const StripeCheckout = lazy(() => (import('./pages/StripeCheckout')))
const PageNotFound = lazy(() => (import('./pages/PageNotFound')))
const ForgotPassword = lazy(() => (import('./features/auth/component/ForgotPassword')))
const ResetPassword = lazy(() => (import('./features/auth/component/ResetPassword')))

export default function App() {

  axios.defaults.headers.common["jwt-routes"] = `${localStorage.getItem("jwt-routes")}`
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsAsync(user._id));
    }
  }, [user])


  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />} >
          <Routes>
            <Route path='/practice' element={<Practice />} />
            <Route path='/' element={<ProtectedPage><HomePage></HomePage></ProtectedPage>} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/detail/:id' element={<ProtectedPage><ProductDetailPage /></ProtectedPage>} />
            <Route path='/cart/:userId' element={<ProtectedPage><CartPage /></ProtectedPage>} />
            <Route path='/order/:userId' element={<ProtectedPage><OrdersPage /></ProtectedPage>} />
            <Route path='/userOrder/:userId' element={<ProtectedPage><UserOrdersPage /></ProtectedPage>} />
            <Route path='/userProfile/:userId' element={<ProtectedPage><UserProfilePage /></ProtectedPage>} />
            <Route path='/wishlist' element={<ProtectedPage><WishlistPage /></ProtectedPage>} />
            <Route path='/compare' element={<ProtectedPage><ComparePage /></ProtectedPage>} />
            <Route path='/infiniteScroll/:category' element={<ProtectedPage><InfiniteScrollPage /></ProtectedPage>} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/orderSuccess/:orderId' element={<OrderSuccess />} />
            <Route path='/stripe-checkout' element={<ProtectedPage><StripeCheckout /></ProtectedPage>} />
            <Route path='/admin/productList' element={<ProtectedAdminPage><AdminProductList></AdminProductList></ProtectedAdminPage>} />
            <Route path='/admin/orders' element={<ProtectedAdminPage><AdminOrders></AdminOrders></ProtectedAdminPage>} />
            <Route path='/admin/productForm/:productId' element={<ProtectedAdminPage><AdminProductForm></AdminProductForm></ProtectedAdminPage>} />
            <Route path='/admin/category' element={<ProtectedAdminPage><AdminCategory></AdminCategory></ProtectedAdminPage>} />
            <Route path='/admin/users' element={<ProtectedAdminPage><AdminUsers /></ProtectedAdminPage>} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
