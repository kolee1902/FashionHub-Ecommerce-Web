import React, { useState } from 'react'
import "./ProductDetailStyle.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../store/actions/addToCartAction';

export default function ProductDetail() {
    const pDetail = useSelector((state) => state.productDetailReducer.productDetail);
    // console.log(pDetail);
    // const { name, price, description, shortDescription, quantity, image } = pDetail;
    const { name, price, image, brand, inventory, describe } = pDetail;
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        if (inventory < 1) {
            alert("Product out of stock !");
            return;
        }
        dispatch(addToCartAction(pDetail));
    }
    const [notification, setNotification] = useState(false);
    const showNotification = () => {
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    }

    return (
        <div>
            <div className="modal fade" id="product-detail" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="exampleModalLabel">PRODUCT DETAIL</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="card mb-3" style={{ maxWidth: 700 }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={image} className="img-fluid rounded-start" alt={name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title product-detail-title fw-bold">{name}</h5>
                                            <p className="card-text"><strong>Brand: </strong>{brand}</p>
                                            <p className="card-text"><strong>Description: </strong>{describe}</p>
                                            <p className="card-text"><strong>Price:</strong> {price} VNĐ</p>
                                            <p className="card-text"><strong>Quantity:</strong> {inventory}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    showNotification();
                                    addToCartHandler();
                                }}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div id="liveToast"
                    className={`toast fade ${notification ? 'show' : 'hide'}`}
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Added one product</strong>
                        <small>Just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                    </div>
                    <div className="toast-body">
                        You just added {name} to your cart
                    </div>
                </div>
            </div>
        </div>
    )
}