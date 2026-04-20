import React, { useEffect, useState } from 'react'
import productsDataJson from "../../data/data.json"
import newProductsData from "../../data/product.json"
import "./mainStyle.css"
import ProductList from '../ProductList/ProductList'
import ProductDetail from '../ProductDetail/ProductDetail'
import axios from 'axios'



export default function HomePage() {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const body = {
                    categoryId: ""
                }
                const response = await axios.post("http://localhost:3001/api/product/get-all-product-not-check", body);
                setProductsData(response.data.rows);
                // console.log(response.data.rows);
                return;
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsData();
    }, [])

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/black-friday-2.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/clothing-store.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/store-front-2.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div id="mainCategories" className="row row-cols-1 row-cols-md-3 g-4 my-5 mx-3">
                <div className="col">
                    <div className="card">
                        <img src="/images/pants.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Thời Trang Đầy Tinh Tế</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="/images/skirt.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Chất Lượng và Xu Hướng Hiện Đại</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="/images/shirts-6.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Trải Nghiệm Mua Sắm Độc Đáo</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-heading" id='discountHeading'>
                <h1>Available Discounts</h1>
            </div>
            <div id="discountGroup">
                <div id="discountCode" className="row row-cols-1 row-cols-md-3 g-4 my-5 mx-3">
                    <div className="col">
                        <div className="card">
                            <img src="/images/discountCode.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Apply this for <strong>25%</strong> discount !</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="/images/discountCode2.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Apply this for <strong>15%</strong> discount !</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="/images/discountCode3.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Apply this for <strong>30%</strong> discount !</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <ProductList productsData={productsData} getProductDetail={getProductDetail} />
            <ProductDetail productDetail={productDetail} /> */}
            <ProductList productsData={productsData} newProductsData={newProductsData} />
            <ProductDetail />

        </div>
    );
}

