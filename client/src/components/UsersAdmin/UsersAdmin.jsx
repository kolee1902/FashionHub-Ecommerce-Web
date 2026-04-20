import React, { useEffect, useState } from 'react'
import "./UsersAdminStyle.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UsersAdmin() {
    const [usersData, setUsersData] = useState([]);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const config = {
                    headers: {
                        'token': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const response = await axios.get("http://localhost:3001/api/get-all-users", config);
                setUsersData(response.data.rows);
                return;
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsData();
    }, [])
    const handleEditRole = async (id, name) => {
        if (role !== "admin") {
            setRole("");
        }
        const body = {
            userId: id,
            role: role
        }
        console.log(name);
        console.log(body);
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post("http://localhost:3001/api/user/edit-user-role", body, config);
        console.log(response);
    }
    const handleDelete = async (id) => {
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers: {
                'token': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.delete(`http://localhost:3001/api/delete-user/${id}`, config);
        // console.log(response);
        return;
    }
    const handleChangeRoleInput = (e) => {
        setRole(e.target.value);
        console.log(e.target.value);
    }
    const handleShowingRoleModal = (id, username) => {
        setUserId(id);
        setUsername(username);
        return;
    }
    const renderUsers = () => {
        console.log(usersData);

        return usersData.map((p) => {
            return (
                <tr key={p.userId}>
                    <td>{p.username}</td>
                    <td>{p.name}</td>
                    {p.role === "admin" ? (
                        <td>
                            Admin
                        </td>
                    ) : (
                        <td>
                            User
                        </td>
                    )}
                    <td>{p.dayOfBirth}</td>
                    <td>{p.email}</td>
                    <td>{p.tel}</td>
                    <td>{p.address}</td>
                    <td className="d-flex" >
                        <button type="button" onClick={() => handleShowingRoleModal(p.userId, p.username)} style={{ height: "50px" }} className="btn btn-warning m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Role</button>
                        <button type="button" onClick={() => handleDelete(p.userId)} style={{ height: "50px" }} className="btn btn-danger m-2">Delete</button>
                    </td>
                </tr>

            );
        });
    }
    return (
        <div id='UsersAdmin'>
            <div className="user-page-wrapper">
                <header className="user-header">
                    <h1>Users</h1>
                    <button type="button" onClick={() => navigate("/productsAdmin")} class="btn btn-success">Back to products</button>
                </header>
                <div className="user-table">
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Birthday</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUsers()}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Setting role</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                            value={"admin"}
                                            checked={role === "admin"}
                                            onChange={(e) => handleChangeRoleInput(e)} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                            value={""}
                                            checked={role !== "admin"}
                                            onChange={(e) => handleChangeRoleInput(e)} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            User
                                        </label>

                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={() => handleEditRole(userId, username)} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
