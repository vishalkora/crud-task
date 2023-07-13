import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function UserForm() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: 'inactive'
    });
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("UserDetails")) ? JSON.parse(localStorage.getItem("UserDetails")) : []);
    const [errorMsg, setErrorMsg] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',

        })
        validateData();
        submitData();
    }

    const submitData = () => {

        // if (errorMsg.firstName || errorMsg.lastName || errorMsg.email || errorMsg.phone) {
        //     return false
        // }

        setUserData([...userData, user]);
        localStorage.setItem("UserDetails", JSON.stringify([...userData, user]));
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            status: 'inactive'
        })
        alert("Create User Successfully")
        navigate('/');
    }
    const validateData = () => {
        const errorMsg = {}
        if (user.firstName === "") {
            errorMsg.firstName = 'Required First Name'
        }
        if (user.lastName === "") {
            errorMsg.lastName = 'Required Last Name'
        }
        if (user.phone === "") {
            errorMsg.phone = 'Required Phone'
        }
        else if (isNaN(user.phone)) {
            errorMsg.phone = 'Invalid Phone'
        }
        if (user.email === "") {
            errorMsg.email = "Required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
            errorMsg.email = "Invalid Email"
        }
        setErrorMsg(errorMsg);
        return errorMsg
    }
    const handleList = () => {
        navigate('/');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mt-5 d-flex justify-content-between">
                    <h1>Create User</h1>
                    <div>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleList()}
                        >
                            <i class="bi bi-list-ul"></i> User List
                        </button>
                    </div>
                </div>
                <hr />
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6 mt-4">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={(e) => handleInputChange(e)} />
                            {errorMsg.firstName && <p className="alert alert-danger p-0 border-0">{errorMsg.firstName}</p>}
                        </div>
                        <div className="col-lg-6 mt-4">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="col-lg-6 mt-4">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="col-lg-6 mt-4">
                            <label>Phone</label>
                            <input type="text" className="form-control" name="phone" value={user.phone} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="col-lg-12 mt-4">
                            <label>Status</label>
                            <select className="form-control" name="status" value={user.status} onChange={(e) => handleInputChange(e)}>
                                <option value="active" >Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-lg-12 mt-4">
                            <button className="btn btn-primary btn-sm form-control" onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserForm;