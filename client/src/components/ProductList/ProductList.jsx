import React from 'react'
import ProductItem from '../ProductItem/ProductItem';
import "./ListStyle.css";

export default function ProductList(props) {
    const { productsData } = props;
    // console.log(productsData);
    const renderProductList = () => {
        return productsData.map((element) => {
            return (
                <div key={element.id} className="col">
                    <ProductItem
                        item={element}
                    />
                </div>
            );
        });
    }
    return (
        <div>
            <div className="main-heading">
                <h1>FashionHub</h1>
            </div>
            <div className="container product-list">
                <div id='product-list' className="row row-cols-1 row-cols-md-4 g-4">
                    {renderProductList()}
                </div>
            </div>
        </div>
    )
}
