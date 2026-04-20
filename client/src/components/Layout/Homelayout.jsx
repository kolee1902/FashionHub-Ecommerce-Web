import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Bottom'

export default function Homelayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            {/* Add footer */}
        </div>
    )
}
