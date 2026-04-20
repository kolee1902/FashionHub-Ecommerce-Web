import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login_style.css"
import $ from "jquery"
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (isEmpty(username)) {
            showError("alertUsername", "(*) Please fill in the field");
            isValid = false;
        } else {
            hideError("alertUsername");
        }
        if (isEmpty(password)) {
            showError("alertPassword", "(*) Please fill in the field");
            isValid = false;
        } else {
            hideError("alertPassword");
        }
        if (isValid) {
            hideError("alertUsername");
            hideError("alertPassword");
            // axios to the server
            const UserData = {
                username: username,
                password: password
            }
            try {
                const response = await axios.post("http://localhost:3001/api/login", UserData);
                // console.log(response.data.accessToken);
                localStorage.setItem("accessToken", response.data.accessToken);
                console.log(localStorage.getItem("accessToken"));
                if (response.data.status === 200) {
                    navigate("/");
                    return;
                } else {
                    showError("alertUsername", "(*) Your username or password is incorrect");
                    showError("alertPassword", "(*) Your username or password is incorrect");
                    return;
                }
            } catch (error) {
                console.log(error);
            }
            return;
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
    return (
        <div id="storeLogin">
            <div className="login-container">
                <form className="login-form" onSubmit={loginHandler}>
                    <h2>Welcome Back!</h2>
                    {/* <label htmlFor="email">Email</label>
                    <input name='email' type="email" id="email" placeholder="Enter Your Email" /> */}
                    <label htmlFor="username">Username</label>
                    <input name='username'
                        type="username"
                        id="text"
                        placeholder="Enter Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <span id="alertUsername" className='alertMessage'></span>

                    <label htmlFor="password">Password</label>
                    <input name='password'
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <span id="alertPassword" className='alertMessage'></span>

                    <button type="submit">Login</button>
                    <div className="divider" />
                    <p className="signup">Don’t have an account? <span onClick={() => navigate("/signup")}>Signup</span></p>
                </form>
            </div>
        </div>
    )
}
