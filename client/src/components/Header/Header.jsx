import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./HeaderStyle.css"
// import { addToCartAction } from '../../store/actions/addToCartAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { searchAction } from '../../store/actions/searchAction';
import { clearCartAction } from '../../store/actions/addToCartAction';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const size = useSelector(state => state.addToCartReducer.size);
    const [keyword, setKeyword] = useState("");
    const handleSearch = async () => {
        try {
            const body = {
                keyword: keyword
            }
            const response = await axios.post("http://localhost:3001/api/product/search-product", body);
            // console.log(response);
            setKeyword("");
            const searchProducts = response.data.rows;
            // move to products page
            dispatch(searchAction(searchProducts));
            navigate("/productsPage");
            return;
        } catch (error) {
            console.log(error);
        }
    }
    const getItemByCategory = async (categoryId) => {
        try {
            const body = {
                categoryId: categoryId
            }
            // console.log(localStorage.getItem("accessToken"));
            const response = await axios.post("http://localhost:3001/api/product/get-all-product-not-check", body);
            // console.log(response.data.rows);
            const searchProducts = response.data.rows;
            dispatch(searchAction(searchProducts));
            navigate("/productsPage");
            return;
        } catch (error) {
            console.log(error);
        }
    }
    const accessToken = localStorage.getItem("accessToken");
    const handleLogout = () => {
        if (accessToken === "" || accessToken === null) {
            return;
        }
        localStorage.removeItem("accessToken");
        dispatch(clearCartAction());
        navigate("/login");
        return;
    }
    // useState(() => {
    //     console.log(localStorage.getItem("accessToken"));
    // })
    const handleAdminBtn = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.get("http://localhost:3001/api/get-profile", config);
        const role = response.data.row.role;
        if (role === "admin") {
            navigate("/productsAdmin");
            return;
        } else {
            alert("Only admin can use this feature !");
            return;
        }
    }
    return (
        <div id="storeHeader">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a onClick={() => navigate("/homepage")} className="navbar-brand" href="#">
                        FashionHub
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className="dropdown">
                                    <a
                                        className="btn btn-dark dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Đầm
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a onClick={() => getItemByCategory("abb87ad1-9e75-4ba9-afc6-9461bb22e0a9")} className="dropdown-item w-100 px-4" href="#">
                                                Đầm Dài
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("5a7f95bb-4aaf-453e-8a7a-a99fe40a5e0c")} className="dropdown-item w-100 px-4" href="#">
                                                Đầm Ngắn
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("e65f80b3-75e4-4dfe-ba22-6dfc67e19c6f")} className="dropdown-item w-100 px-4" href="#">
                                                Đầm Ôm
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <a
                                        className="btn btn-dark dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Quần/Váy
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a onClick={() => getItemByCategory("2469c4cc-dc49-4424-93ba-cf82b29dc03e")} className="dropdown-item w-100 px-4" href="#">
                                                Jeans
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("88e27681-6a74-47fa-9cf0-49981d34baeb")} className="dropdown-item w-100 px-4" href="#">
                                                Quần Váy
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("fa7dbfdb-ed58-42c3-b0b3-2a640e12bdf3")} className="dropdown-item w-100 px-4" href="#">
                                                Váy Chữ A
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("7eff5c96-17c0-4fd5-87c9-4e86f295c430")} className="dropdown-item w-100 px-4" href="#">
                                                Quần Short
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("3ac97a94-5241-4daf-8847-b472420e89c7")} className="dropdown-item w-100 px-4" href="#">
                                                Quần Dài
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <a
                                        className="btn btn-dark dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Áo
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a onClick={() => getItemByCategory("5c1d8888-8a91-46a5-811e-306457bd7ffe")} className="dropdown-item w-100 px-4" href="#">
                                                Áo Dài
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("bad6fa21-2e32-4878-9c42-72bf93ad69a8")} className="dropdown-item w-100 px-4" href="#">
                                                Áo Croptop
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => getItemByCategory("eb04c3fb-de46-4e70-b5bf-f3e0aa06e174")} className="dropdown-item w-100 px-4" href="#">
                                                Áo Thun
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item space-s"></li>
                        </ul>
                    </div>
                    {accessToken && (
                        <>
                            <button onClick={() => navigate("/cart")} id='shoppingCart' className="dropdown-item position-relative" type="button">
                                <i className="fa-solid fa-cart-shopping" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: '10px' }}>
                                    {size}
                                </span>
                            </button>

                        </>
                    )}

                </div>
                <form className="d-flex search-form" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-dark" type="button" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </form>

                {/* <Cart cartList={this.props.cartList} /> */}
                <div id='user-actions' className="btn-group">
                    <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                    >
                        <i className="fa-solid fa-user" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                        {accessToken ? (
                            <>
                                <li>
                                    <button onClick={() => handleLogout()} className="dropdown-item" type="button">
                                        <i className="fa-solid fa-right-from-bracket" style={{ color: '#000000' }}></i> Logout
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/userProfile")} className="dropdown-item" type="button">
                                        <i className="fa-solid fa-circle-info" style={{ color: '#000000' }}></i> Your Profile
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleAdminBtn()} className="dropdown-item" type="button">
                                        <i className="fa-solid fa-user-tie" style={{ color: '#000000' }}></i> Admin
                                    </button>
                                </li>
                            </>

                        ) : (
                            <>
                                <li>
                                    <button onClick={() => navigate("/login")} className="dropdown-item" type="button">
                                        <i className="fa-solid fa-right-to-bracket" style={{ color: '#000000' }} /> Login
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/signup")} className="dropdown-item" type="button">
                                        <i className="fa-solid fa-user-plus" style={{ color: '#000000' }} /> Signup
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </nav>
        </div>


    );
}
