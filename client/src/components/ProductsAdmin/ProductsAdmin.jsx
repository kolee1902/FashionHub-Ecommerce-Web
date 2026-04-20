import React, { useEffect, useState } from 'react'
import "./ProductsAdminStyle.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductsAdmin() {
    const [modifyProduct, setModifyProduct] = useState("ADD");
    const [productsData, setProductsData] = useState([]);
    const [display, setDisplay] = useState("none");

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [price, setPrice] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [cate, setCate] = useState("Choose Category");
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [productID, setProductID] = useState("");
    const [input, setInput] = useState("");

    const navigate = useNavigate();


    const handleAddProductModal = () => {
        setModifyProduct("ADD");
        if (display === "block") {
            setDisplay("none");
        } else {
            setDisplay("block");
        }
        setName("");
        setDes("");
        setPrice(0);
        setInventory(0);
        setCate("Choose Category");
        setImg("");
        setBrand("");
        // console.log(display);
        return;
    }
    const handleEditProductModal = (p) => {
        setModifyProduct("EDIT");
        if (display === "block") {
            setDisplay("none");
        } else {
            setDisplay("block");
        }
        setName(p.name);
        setDes(p.describe);
        setPrice(p.price);
        setInventory(p.inventory);
        setCate(p.cateName);
        setImg(p.image);
        setBrand(p.brand);
        setProductID(p.id);
    }
    const handleEditBtn = async () => {
        const body = {
            id: productID,
            name: name,
            describe: des,
            price: price,
            inventory: inventory,
            image: img,
            brand: brand
        }
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        // console.log(body);
        const response = await axios.post("http://localhost:3001/api/product/edit-product", body, config);
        console.log(response);
        setDisplay("none");
    }

    const handleAddBtn = async () => {
        const body = {
            name: name,
            describe: des,
            price: price,
            inventory: inventory,
            cateName: cate,
            image: img,
            brand: brand
        }
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        // console.log(body);
        const response = await axios.post("http://localhost:3001/api/product/add-product", body, config);
        console.log(response);
        // const getProductsBody = {
        //     categoryId: ""
        // }
        // const productsResponse = await axios.post("http://localhost:3001/api/product/get-all-product-not-check", getProductsBody);
        // const newProducts = productsResponse.data.rows;
        // setProductsData(newProducts);
        setDisplay("none");
    }
    const handleDeleteBtn = async (p) => {
        const body = {
            id: p.id
        }
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post("http://localhost:3001/api/product/delete-product", body, config);
        console.log(response);
        return;
    }
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const body = {
                    categoryId: ""
                }
                const response = await axios.post("http://localhost:3001/api/product/get-all-product-not-check", body);
                setProductsData(response.data.rows);
                return;
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsData();
    }, [])
    const renderProductsTable = () => {
        return productsData.map((p) => {
            return (
                <tr key={p.id}>
                    <td><img src={p.image} alt="Đầm dài bệt vai" /></td>
                    <td>{p.name}</td>
                    <td>{p.price} VNĐ</td>
                    <td>{p.brand}</td>
                    <td>{p.inventory}</td>
                    <td className="">
                        <button type="button" onClick={() => handleEditProductModal(p)} className="btn btn-warning m-2">Edit</button>
                        <button type="button" onClick={() => handleDeleteBtn(p)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
    }
    const handleSearchProduct = async () => {
        const body = {
            keyword: input
        }
        const response = await axios.post("http://localhost:3001/api/product/search-product", body);
        setProductsData(response.data.rows);
        return;
    }
    return (
        <div id='productsAdmin'>
            <div className="product-page-wrapper">
                <header className="product-header">
                    <h1>Products</h1>
                    <div className="d-flex gap-3">
                        <button className="btn btn-primary" type='button' onClick={() => navigate("/usersAdmin")}>Move to Users</button>
                        <button className="btn btn-success" type='button' onClick={() => handleAddProductModal()}>Add New Products</button>
                    </div>
                </header>
                <div className="search-bar mb-3">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search..." />
                    <button className="btn btn-primary" type='button' onClick={() => handleSearchProduct()} >Search Product</button>
                </div>
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Inventory</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows go here */}
                            {renderProductsTable()}
                        </tbody>
                    </table>
                    {/* Add New Product Modal */}
                    <div id="addProductModal" className="modal" style={{ display: `${display}` }}>
                        {/* Modal content */}
                        <div className="modal-content">
                            <span className="close" onClick={() => handleAddProductModal()}>×</span>
                            {modifyProduct === "ADD" ? (
                                <h2>Add new product</h2>
                            ) : (
                                <h2>Edit product</h2>
                            )}
                            <form id="addProductForm">
                                <label htmlFor="Name">Name</label>
                                <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <label htmlFor="Descibe">Describe</label>
                                <input type="text" id="Descibe" name="Descibe" value={des} onChange={(e) => setDes(e.target.value)} placeholder="Descibe" />
                                <label htmlFor="Price">Price</label>
                                <input type="number" id="Price" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                                <label htmlFor="Inventory">Inventory</label>
                                <input type="number" id="Inventory" name="Inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} placeholder="Enter inventory quantity" />
                                {modifyProduct === "ADD" ? (
                                    <>
                                        <label htmlFor="Category-name">Category</label>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                {cate}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><a className="dropdown-item" onClick={() => setCate("Đầm Dài")} href="#">Đầm Dài</a></li>
                                                <li><a className="dropdown-item" onClick={() => setCate("Đầm Ngắn")} href="#">Đầm Ngắn</a></li>
                                                <li><a className="dropdown-item" onClick={() => setCate("Jeans")} href="#">Jeans</a></li>
                                                <li><a className="dropdown-item" onClick={() => setCate("Quần Váy")} href="#">Quần Váy</a></li>
                                                <li><a className="dropdown-item" onClick={() => setCate("Áo dài")} href="#">Áo dài</a></li>
                                                <li><a className="dropdown-item" onClick={() => setCate("Croptop")} href="#">Croptop</a></li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="Name">Product ID</label>
                                        <input type="text" id="Name" name="Name" value={productID} placeholder="Name" readOnly disabled />
                                    </>
                                )}


                                <label htmlFor="image">Image URL</label>
                                <input type="url" id="image" name="Image" value={img} onChange={(e) => setImg(e.target.value)} placeholder="Enter image URL" />
                                <label htmlFor="Brand">Brand</label>
                                <input type="text" id="Brand" name="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand name" />
                                {modifyProduct === "ADD" ? (
                                    <>
                                        <button type="button" onClick={() => handleAddBtn()}>Add Product</button>

                                    </>
                                ) : (
                                    <>
                                        <button type="button" onClick={() => handleEditBtn()}>Edit Product</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
