import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductList from '../ProductList/ProductList';
import ProductDetail from '../ProductDetail/ProductDetail';

export default function ProductsPage() {
    const searchData = useSelector(state => state.searchReducer.searchData);
    // useEffect(() => {
    //     console.log("search: ", searchData);
    // }, [searchData])
    return (
        <div>
            <ProductList productsData={searchData} />
            <ProductDetail />
        </div>
    )
}
