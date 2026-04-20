import React, { useEffect, useState } from 'react'
import "./UserProfileStyle.css";
import axios from 'axios';

export default function UserProfile() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getUserInfo = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    'token': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.get("http://localhost:3001/api/get-profile", config);
            return response.data.row;
        }
        const getOrdersInfo = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    'token': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.get("http://localhost:3001/api/order/get-all-order", config);
            return response.data.rows;
        }
        const fetchData = async () => {
            const info = await getUserInfo();
            setId(info.userId);
            setName(info.name);
            setMail(info.email);
            setDob(info.dayOfBirth);
            setPhone(info.tel);
            setUsername(info.username);

            const ordersFromDB = await getOrdersInfo();
            setOrders(ordersFromDB);
        }
        fetchData();
    }, [])
    const renderOrders = () => {
        return orders.map((p) => {
            return (
                <tr key={p.id}>
                    <td>{p.orderNo}</td>
                    <td>{p.createdAt}</td>
                    <td>{p.totalAmount} VNĐ</td>
                    <td>{p.status}</td>
                </tr>
            );
        });
    }

    return (
        <div id='userInfo' className='userInfo'>
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Account settings
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-orders">My orders</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">

                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">User ID</label>
                                            <input type="text" className="form-control mb-1" value={id} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control mb-1" value={username} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" value={name} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="form-control mb-1" value={mail} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Birthday</label>
                                            <input type="date" className="form-control mb-1" value={dob} name="birthday" readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Telephone</label>
                                            <input type="tel" className="form-control mb-1" value={phone} name="telephone" readOnly />
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" />
                                        </div> */}
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="account-orders">
                                    <table className="order-table">
                                        <thead>
                                            <tr>
                                                <th>Order No</th>
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Order Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderOrders()}
                                            {/* Repeat rows for each order */}
                                        </tbody>
                                    </table>

                                </div>
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Current password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">New password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Repeat new password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-social-links">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Twitter</label>
                                            <input type="text" className="form-control" defaultValue="https://twitter.com/user" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Facebook</label>
                                            <input type="text" className="form-control" defaultValue="https://www.facebook.com/user" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Google+</label>
                                            <input type="text" className="form-control" defaultValue />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">LinkedIn</label>
                                            <input type="text" className="form-control" defaultValue />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Instagram</label>
                                            <input type="text" className="form-control" defaultValue="https://www.instagram.com/user" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-connections">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-twitter">Connect to
                                            <strong>Twitter</strong></button>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <a href="javascript:void(0)" className="float-right text-muted text-tiny"><i className="ion ion-md-close" /> Remove</a>
                                            <i className="ion ion-logo-google text-google" />
                                            You are connected to Google:
                                        </h5>
                                        <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f9979498818e9c9595b994989095d79a9694">[email&nbsp;protected]</a>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <button type="button" className="btn btn-facebook">Connect to
                                            <strong>Facebook</strong></button>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <button type="button" className="btn btn-instagram">Connect to
                                            <strong>Instagram</strong></button>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-notifications">
                                    <div className="card-body pb-2">
                                        <h6 className="mb-4">Activity</h6>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone comments on my article</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone answers on my forum
                                                    thread</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone follows me</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body pb-2">
                                        <h6 className="mb-4">Application</h6>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">News and announcements</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Weekly product updates</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Weekly blog digest</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
                    <button type="button" className="btn btn-default">Cancel</button>
                </div> */}
            </div>
        </div>
    )
}
