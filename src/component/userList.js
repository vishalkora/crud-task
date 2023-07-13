import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ModalPopUp from "../helper/modal";

function UserList() {
    const [deleteuser, setDeleteUser] = useState({
        firstName: '',
        lastName: '',
    });
    const [filter, setFilter] = useState({
        column: 'firstName',
        searchKey: ''
    })
    const [isConformDelete, setIsConformDelete] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [userDetails, setUserDetails] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        let UserDetailsGetFromLocal = JSON.parse(localStorage.getItem("UserDetails"));
        setUserDetails(UserDetailsGetFromLocal);
    }
    const handleEdit = (id) => {
        navigate(`/editUser/${id}`);
    }
    const handleClose = () => {
        setIsConformDelete(!isConformDelete)
    }
    const handleConfirm = () => {
        const newData = [...userDetails];
        newData.splice(deleteIndex, 1);
        localStorage.setItem("UserDetails", JSON.stringify([...newData]));
        setUserDetails([...newData]);
        setIsConformDelete(false);
    }
    const handleDelete = (item, id) => {
        setDeleteIndex(id);
        setIsConformDelete(true);
        setDeleteUser({
            firstName: item.firstName,
            lastName: item.lastName
        })

    }
    const handleCreateForm = () => {
        navigate('/createUser');
    }
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }
    const handleApplyFilter = () => {
        const { column, searchKey } = filter

        switch (column) {
            case "firstName":
                return setUserDetails(userDetails.filter((item) => item.firstName === searchKey))
                break;
            case "lastName":
                return setUserDetails(userDetails.filter((item) => item.lastName === searchKey))
                break;
            case "email":
                return setUserDetails(userDetails.filter((item) => item.email === searchKey))
                break;
            case "phone":
                return setUserDetails(userDetails.filter((item) => item.phone === searchKey))
                break;
            default:
                return setUserDetails(userDetails.filter((item) => item.firstName === searchKey))
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mt-5 d-flex justify-content-between">
                    <h1>User List</h1>
                    <div>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleCreateForm()}
                        >
                            <i class="bi bi-plus-square"></i> Create New user
                        </button>
                    </div>
                </div>
                <hr />
                <div className="col-lg-3">
                    <label>Select Column</label>
                    <select className="form-control" name="column" value={filter.column} onChange={(e) => handleFilterChange(e)}>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="email">Email Name</option>
                        <option value="phone">Phone</option>
                    </select>
                </div>
                <div className="col-lg-3">
                    <label></label>
                    <input type="text"
                        className="form-control"
                        name="searchKey"
                        placeholder="Search Here..."
                        onChange={(e) => handleFilterChange(e)}
                    />
                </div>
                <div className="col-lg-3">
                    <button className="btn btn-sm btn-primary mt-4"
                        onClick={() => handleApplyFilter()}
                    >
                        Apply
                    </button>
                </div>
                <div className="col-lg-12 mt-3">
                    <table className="table table-border table-hover">
                        <thead className="">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails?.length > 0 ?
                                userDetails?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <span className={item.status === "active" ? 'px-4 py-2 badge bg-success text-capitalize' : 'px-4 py-2 badge bg-danger text-capitalize'}> {item.status}</span>
                                        </td>
                                        <td colSpan={2}>
                                            <button
                                                className="btn btn-sm btn-light text-primary"
                                                onClick={() => handleEdit(index)}
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Edit"
                                            ><i class="bi bi-pencil-square"></i></button>
                                            &nbsp;&nbsp;
                                            <button
                                                className="btn btn-sm btn-light text-danger"
                                                onClick={() => handleDelete(item, index)}
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Delete"
                                            >
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                })
                                :
                                <tr>
                                    <td colSpan={7} className="text-center p-5"><h6>No Record Found</h6></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-12">

                </div>
                {isConformDelete &&
                    <ModalPopUp
                        userDetails={deleteuser}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                }
            </div>
        </div>
    )
}

export default UserList;