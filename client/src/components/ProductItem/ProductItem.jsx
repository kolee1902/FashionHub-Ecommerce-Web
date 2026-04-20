import React, { useState } from 'react'
import "./ItemStyle.css"
import { useDispatch } from 'react-redux';
import { setProductDetailAction } from '../../store/actions/productDetailAction';
import { addToCartAction } from '../../store/actions/addToCartAction';

export default function ProductItem({ item }) {
    const dispatch = useDispatch();
    // const currentState = useSelector(state => state.addToCartReducer.cartList);
    // console.log(currentState);
    const showDetailHandler = () => {
        dispatch(setProductDetailAction(item));
    }
    const accessToken = localStorage.getItem("accessToken");
    const addToCartHandler = () => {
        if (accessToken === "" || accessToken === null) {
            alert("You need to log in to add product to cart");
            return;
        }
        // console.log(item.inventory);
        if (item.inventory < 1) {
            alert("Product out of stock !");
            return;
        }
        dispatch(addToCartAction(item));
    }
    const [notification, setNotification] = useState(false);
    const showNotification = () => {
        // if (notification) {
        //     setNotification(false);
        // } else {
        //     setNotification(true);
        // }
        if (accessToken === "" || accessToken === null) {
            return;
        }
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    }
    const { name, price, image, brand, inventory } = item;
    return (
        <div>
            <div className="card product-item">
                <div className="img-container">
                    <img src={image} className="card-img-top img-thumbnail product-image" alt={name} />
                </div>
                <div className="card-body">
                    <h5 className="card-title fw-bold fs-5">{name}</h5>
                    <p className="card-text">Price: {price}VNĐ</p>
                    <p className="card-text">Brand: {brand}</p>
                    <p className="card-text">Inventory: {inventory}</p>
                </div>
                <div className="card-footer">
                    {/* add onclick event for these buttons */}
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            addToCartHandler();
                            showNotification();
                        }}>Add to cart</button>
                    <button
                        type="button" className="btn btn-warning"
                        data-bs-toggle="modal" data-bs-target="#product-detail"
                        // onClick={() => this.props.getProductDetail(this.props.item)}
                        onClick={showDetailHandler}
                    >Information</button>
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
    );
}
