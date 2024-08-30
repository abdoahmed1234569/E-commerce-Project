/* eslint-disable react/no-unescaped-entities */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import UserContextProvider from './context/UserContext';
import Brands from './component/brands/brands';
import Carts from './component/carts/carts';
import ProtectedRoute from './component/protectedRoute/protectedRoute';
import ProductDetails from './component/ProductDetails/ProductDetails';
import { CartContextProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Checkout from './component/checkout/checkout';
import Allorders from './component/allorders/allorders';
import Category from './component/Category/Category';
import ForgetPassword from './component/ForgetPassword/ForgetPassword';
import WishList from './component/WishList/WishList';
import ResetCode from './component/ResetCode/ResetCode';
import ResetPassword from './component/ResetPassword/ResetPassword';

const queryClient = new QueryClient()

let routes = createBrowserRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/forget-password', element: <ForgetPassword />},
    {path: '/reset-code', element: <ResetCode />},
    {path: '/reset-password', element: <ResetPassword />},
    {path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>},
    {path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute>},
    {path: '/checkout/:id', element: <ProtectedRoute><Checkout /></ProtectedRoute>},
    {path: '/productDetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path: '/carts', element: <ProtectedRoute><Carts /></ProtectedRoute>},
    {path: '/category', element: <ProtectedRoute><Category /></ProtectedRoute>},
    {path: '/wishList', element: <ProtectedRoute><WishList /></ProtectedRoute>},
    {path: '*', element: <h1 className='text-red-700 text-center mt-44 text-3xl'>Not Found</h1>}
  ]}
])
function App() {

  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </QueryClientProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App
