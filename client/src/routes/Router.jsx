import React from 'react'
import { useRoutes } from 'react-router-dom'
import Homelayout from '../components/Layout/Homelayout';
// import ShoesStore from '../components/ShoesStore/ShoesStore';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import HomePage from '../components/Homepage/Homepage';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import UserProfile from '../components/userInfo/UserProfile';
import ProductsAdmin from '../components/ProductsAdmin/ProductsAdmin';
import UsersAdmin from '../components/UsersAdmin/UsersAdmin';

export default function Router() {
    const routing = useRoutes([
        {
            path: "/",
            // main is a HomeLayout
            element: <Homelayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />
                },
                {
                    path: "/homepage",
                    element: <HomePage />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Signup />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/productsPage",
                    element: <ProductsPage />
                },
                {
                    path: "/userProfile",
                    element: <UserProfile />
                },
                {
                    path: "/productsAdmin",
                    element: <ProductsAdmin />
                },
                {
                    path: "/usersAdmin",
                    element: <UsersAdmin />
                }
            ]
        }
    ]);
    return routing;
}
