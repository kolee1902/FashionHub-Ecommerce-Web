import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./CheckoutStyle.css"
import { useSelector } from 'react-redux';
import $ from "jquery"
import axios from 'axios';

export default function Checkout() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [mail, setMail] = useState("");
    const [payment, setPayment] = useState("COD");
    const [price, setPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalCost, setFinalCost] = useState(price);
    const [discountCode, setDiscountCode] = useState("");
    const products = useSelector((state) => state.addToCartReducer.cartList);


    const handlePaymentChange = (payment) => {
        setPayment(payment);
        return;
    }
    const handlePurchase = async () => {
        let isValid = true;
        if (isEmpty(fullname)) {
            showError("alertName", "(*) Please fill in the field to continue purchase !");
            isValid = false;
        } else {
            hideError("alertName");
        }
        if (isEmpty(phone)) {
            showError("alertPhone", "(*) Please fill in the field to continue purchase !");
            isValid = false;
        } else {
            hideError("alertPhone");
        }
        if (isEmpty(address)) {
            showError("alertAddress", "(*) Please fill in the field to continue purchase !");
            isValid = false;
        } else {
            hideError("alertAddress");
        }
        if (!isValid) {
            return;
        } else {
            hideAllError();
        }
        const body = {
            name: fullname,
            phone: phone,
            address: address,
            price: price,
            discountAmount: discountAmount,
            totalAmount: finalCost,
            paymentMethod: payment,
            discountCode: discountCode,
            shippingAddress: address,
            notes: notes,
            orderNo: localStorage.getItem("orderNo")
        }
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post("http://localhost:3001/api/order/confirm-payment", body, config);
        console.log(response);
        navigate("/userProfile");
        return;
    }

    const handleApplyDiscount = () => {
        switch (discountCode) {
            case "CODE2024XY":
                setDiscountAmount(25 / 100 * price);
                setFinalCost(75 / 100 * price);
                break;
            case "2024SAV15":
                setDiscountAmount(15 / 100 * price);
                setFinalCost(85 / 100 * price);
                break;
            case "FLASH30":
                setDiscountAmount(30 / 100 * price);
                setFinalCost(70 / 100 * price);
                break;
            default:
                setDiscountAmount(0);
                setFinalCost(price);
                alert("Discount code does not exist !");
                break;
        }
    }
    const isEmpty = (value) => {
        return value.trim() === "";
    }
    const showError = (id, message) => {
        $(`#${id}`).html(message);
    }
    const hideError = (id) => {
        $(`#${id}`).html("");
    }
    const hideAllError = () => {
        hideError("alertName");
        hideError("alertPhone");
        hideError("alertAddress");
    }

    useEffect(() => {
        console.log(products);
        let initPrice = 0;
        products.forEach((p) => {
            initPrice += p.price * p.quantity;
        })
        setPrice(initPrice);
        setFinalCost(initPrice);
    }, [products])

    return (
        <div id='checkoutPage' className="wrapper" style={{ backgroundColor: "#F1D4E5" }}>
            <div className="container">
                <form>
                    <h1>
                        <i className="fas fa-shipping-fast" />
                        Shipping Details
                    </h1>
                    <div className="name">
                        <div>
                            <label htmlFor="f-name">Fullname</label>
                            <input type="text"
                                name="f-name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)} />
                            <span className='alertMessage' id='alertName'></span>
                        </div>
                        <div>
                            <label htmlFor="l-name">Phone</label>
                            <input type="text"
                                name="l-name"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <span className='alertMessage' id="alertPhone"></span>
                        </div>
                    </div>
                    <div className="street">
                        <label htmlFor="name">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        <span className='alertMessage' id="alertAddress"></span>
                    </div>
                    <div className="street">
                        <label htmlFor="name">Notes</label>
                        <input type="text"
                            name="address"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="street">
                        <label htmlFor="name">Mail</label>
                        <input
                            type="email"
                            name="address"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} />
                    </div>
                    {/* <div className="address-info">
                        <div>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <input type="text" name="state" />
                        </div>
                        <div>
                            <label htmlFor="zip">Zip</label>
                            <input type="text" name="zip" />
                        </div>
                    </div> */}
                    <h1>
                        <i className="far fa-credit-card" /> Payment Information
                    </h1>

                    <div className="cc-info">
                        <div>
                            <label htmlFor="card-num">Price</label>
                            <input type="text" name="expire"
                                value={price + " VNĐ"}
                                disabled />
                        </div>
                        <div>
                            <label htmlFor="card-num">Discount Code</label>
                            <input type="text"
                                name="security"
                                value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder='add your discount code here...' />

                        </div>
                    </div>
                    <div className="btns" id='applyDiscountBtn'>
                        <button type='button' onClick={() => handleApplyDiscount()}>Apply Discount</button>
                    </div>
                    <div className="cc-num">
                        <label htmlFor="card-num">Discount Amount</label>
                        <input type="text" name="card-num" value={discountAmount + "VNĐ"} disabled />
                    </div>
                    <div className="cc-num">
                        <label htmlFor="card-num">Final Discounted Amount</label>
                        <input type="text" name="card-num" value={finalCost + "VNĐ"} disabled />
                    </div>
                    <div className="cc-num">
                        <div className="paymentForm d-flex flex-column mb-3">
                            <label className="mb-2" htmlFor="card-num">Payment Method</label>
                            {/* <input type="text" name="card-num" /> */}
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio1"
                                    autoComplete="off"
                                    onChange={() => handlePaymentChange("COD")}
                                    defaultChecked />
                                <label className="btn btn-outline-danger fw-bold"
                                    htmlFor="btnradio1"
                                >COD</label>
                                <input type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio2"
                                    autoComplete="off"
                                    onChange={() => handlePaymentChange("BANK")} />
                                <label className="btn btn-outline-danger fw-bold"
                                    htmlFor="btnradio2"
                                >Banking</label>
                            </div>
                        </div>

                        {payment === "BANK" && (
                            <>
                                <div className="cc-num mb-3">
                                    <label htmlFor="card-num">Bank's Name</label>
                                    <input type="text" name="card-num" className="fs-5 fw-bold" defaultValue={"SACOMBANK"} disabled />
                                </div>
                                <div className="cc-num mb-3">
                                    <label htmlFor="card-num">Recipient's Name</label>
                                    <input type="text" name="card-num" className="fs-5 fw-bold" defaultValue={"LE PHUOC QUANG HUY"} disabled />
                                </div>
                                <div className="cc-num mb-3">
                                    <label htmlFor="card-num">Recipient's account number</label>
                                    <input type="text" name="card-num" className="fs-5 fw-bold" defaultValue={"040099321001"} disabled />
                                </div>
                            </>
                        )}


                    </div>
                    <div className="btns">
                        <button type='button' onClick={() => handlePurchase()}>Purchase</button>
                        <button onClick={() => navigate("/")}>Back to cart</button>
                    </div>
                    <div style={{ marginTop: "-5px", marginLeft: "45px" }}>(please wait seconds..)</div>
                </form>
            </div>
        </div>
    )
}
