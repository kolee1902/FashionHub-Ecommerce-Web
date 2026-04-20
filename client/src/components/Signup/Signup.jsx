import React, { useState } from 'react'
import "./signup_style.css"
import $ from "jquery"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        // console.log(username, email, password, retypePassword);
        let isValid = true;
        // console.log(isEmpty(name));

        if (isEmpty(name)) {
            showError("alertName", "(*) Please fill in the field");
            isValid = false;
        }
        if (isEmpty(username)) {
            showError("alertUsername", "(*) Please fill in the field");
            isValid = false;
        } else if (!isValidUsername(username)) {
            showError("alertUsername", "(*) Username must not contain spaces, can only include letters, numbers, underscores, and cannot start with a number.");
            isValid = false;
        }
        if (isEmpty(email)) {
            showError("alertEmail", "(*) Please fill in the field");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError("alertEmail", "(*) Incorrect Email");
            isValid = false;
        }
        if (isEmpty(password)) {
            showError("alertPassword", "(*) Please fill in the field");
            isValid = false;
        }
        if (isEmpty(retypePassword)) {
            showError("alertRetypePassword", "(*) Please fill in the field");
            isValid = false;
        }
        if (password !== retypePassword) {
            showError("alertRetypePassword", "(*) Retype password does not match");
            isValid = false;
        }
        if (isEmpty(phone)) {
            showError("alertPhone", "(*) Please fill in the field");
            isValid = false;
        } else if (!isValidPhoneNumber(phone)) {
            showError("alertPhone", "(*) Phonenumber must have 10 numbers, starting with 0");
            isValid = false;
        }

        if (isValid) {
            hideAllError();
            // alert("Signup successfully");
            const UserData = {
                username: username,
                email: email,
                password: password,
                name: name,
                tel: phone,
            };
            try {
                const response = await axios.post("http://localhost:3001/api/register", UserData);
                // console.log(response.data.status);
                if (response.data.status === 400) {
                    // console.log("status 400");
                    showError("alertUsername", "(*) Username or mail already existed!");
                    showError("alertMail", "(*) Username or mail already existed!");

                    return;
                } else {
                    navigate("/login");
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const isValidUsername = (value) => {
        let regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        if (value.trim().match(regex)) {
            return true;
        }
        return false;
    }
    const isValidEmail = (value) => {
        let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (value.trim().match(regex)) {
            return true;
        }
        return false;
    }
    const isValidPhoneNumber = (value) => {
        let regex = /^(0\d{9})$/;
        if (value.trim().match(regex)) {
            return true;
        }
        return false;
    }
    const showError = (id, message) => {
        $(`#${id}`).html(message);
    }
    const hideError = (id) => {
        $(`#${id}`).html("");
    }
    const hideAllError = () => {
        hideError("alertName");
        hideError("alertUsername");
        hideError("alertPhone");
        hideError("alertEmail");
        hideError("alertPassword");
        hideError("alertRetypePassword");
    }
    const isEmpty = (value) => {
        return value.trim() === "";
    }
    return (
        <div id="storeSignup">
            <div className="container">
                <div className="signup-form">
                    <div className="header">
                        <h2 className="text-center my-2">Sign Up</h2>
                        <p>Become part of the FashionHub shopping community</p>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="form-control">
                            <label htmlFor="password">Name</label>
                            <input
                                name='password'
                                type="text"
                                id="password"
                                placeholder="Password"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <span id="alertName"></span>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Telephone</label>
                            <input
                                name='password'
                                type="text"
                                id="password"
                                placeholder="Password"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <span id="alertPhone"></span>
                        </div>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input
                                name='email'
                                type="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <span id="alertEmail"></span>

                        </div>

                        <div className="form-control">
                            <label htmlFor="name" className='form-label'>Username</label>
                            <input
                                className='form-control'
                                name='username'
                                type="text"
                                id="name"
                                placeholder="Enter Your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <span id="alertUsername"></span>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input
                                name='password'
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <span id="alertPassword"></span>
                        </div>
                        <div className="form-control">
                            <label htmlFor="retype-password">Re-Type Password</label>
                            <input
                                name='retype-password'
                                type="password"
                                id="retype-password"
                                placeholder="Re-Type Password"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)} />
                            <span id="alertRetypePassword"></span>

                            {/* <p>Retype password is incorrect</p> */}
                        </div>
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
