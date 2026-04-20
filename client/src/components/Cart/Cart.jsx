import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CartStyle.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../store/actions/addToCartAction';
import { removeProductFromCart } from '../../store/actions/addToCartAction';
import axios from 'axios';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.addToCartReducer.cartList);
    const accessToken = localStorage.getItem("accessToken");
    const addToCartHandler = (item) => {
        if (accessToken === "" || accessToken === null) {
            alert("You need to log in to add product to cart");
            return;
        }
        dispatch(addToCartAction(item));
    }
    const removeProductHandler = (id) => {
        if (accessToken === "" || accessToken === null) {
            return;
        }
        dispatch(removeProductFromCart(id));
    }
    const renderCartPageContent = () => {
        console.log(products);
        if (products.length === 0) {
            return (
                <div className="card my-2" style={{ height: "fit-content" }}>
                    <div className="card-body text-end">
                        <h3 className="text-center my-0">Your shopping cart is empty!</h3>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {renderProducts()}
                <div className="card" style={{ height: "fit-content" }}>
                    <div className="card-body text-end">
                        <button onClick={() => handleCheckout()} type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                    </div>
                </div>
            </div>
        )

    }
    const renderProducts = () => {
        return products.map((p) => {
            const { id, name, image, quantity, price } = p;
            const total_price = quantity * price;
            return (
                <div className="card rounded-3 mb-4" key={id}>
                    <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img src={image} className="img-fluid rounded-3" alt={name} />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                                <p className="lead fw-normal mb-2 fw-bold">{name}</p>
                                {/* <p><span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey</p> */}
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button className="btn btn-link px-2" onClick={() => removeProductHandler(id)}>
                                    <i className="fas fa-minus" />
                                </button>
                                <input id="form1" min={0} name="quantity" readOnly value={quantity} type="number" className="form-control form-control-sm" />
                                <button className="btn btn-link px-2" onClick={() => addToCartHandler(p)}>
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0">{total_price} VNĐ</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    const handleCheckout = async () => {
        const body = {
            listItem: products
        }
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post("http://localhost:3001/api/order/create-order", body, config);
        const orderNo = response.data.orderNo;
        localStorage.setItem("orderNo", orderNo);
        navigate("/checkout");
    }
    // console.log(products);
    return (
        <section className="h-100" id='shoppingCartPage' style={{ backgroundColor: '#eee' }}>
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">
                        <i onClick={() => navigate("/")} className="fa-solid fa-house fa-xl"></i>
                        <div className="d-flex justify-content-between align-items-center mb-4 my-2">
                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                        </div>
                        {renderCartPageContent()}


                    </div>
                </div>
            </div>
        </section >
    )
}