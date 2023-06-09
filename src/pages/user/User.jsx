
/* eslint-disable react-hooks/rules-of-hooks */
import "./user.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState , useEffect} from "react";
import Alert from 'react-bootstrap/Alert'

export default function UpdateUser() {
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userr, setUser] = useState({
    user: "",
    email: "",
    password: "",
    phone: "",
    warehouse_id: "",
    status:"",
    loading: false,
    err: "",
    result: [],
    success: "",
    reload: false,
  });

  const update = (e) => {
    e.preventDefault();
    setUser({ ...userr, loading: true });
    const formData = new FormData();
    formData.append("user", userr.user);
    formData.append("email", userr.email);
    formData.append("password", userr.password);
    formData.append("status", userr.status);
    formData.append("phone", userr.phone);
    formData.append("warehouse_id", userr.warehouse_id);

    axios
      .put("http://localhost:4000/user/" + id, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setUser({
          ...userr,
          loading: false,
          success:"User updated successfully",
          err:null,
        });
      })
      .catch((err) => {
        setUser({
          ...userr,
          loading: false,
          err: "Email or warehouse is be wrong",
          success: null,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/" + id)
      .then((resp) => {
        setUser({
          ...userr,
          user: resp.data.user,
          email: resp.data.email,
          password: resp.data.password,
          phone: resp.data.phone,
          warehouse_id: resp.data.warehouse_id,
          status:resp.data.status,
        });
      })
      .catch((err) => {
        setUser({
          ...userr,
          loading: false,
          err: "something wrong",
          successMsg: null,
        });
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userr.reload]);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle"> Edit User</h1>
      {userr.err &&(
                    <Alert  variant="danger" className="ppp">
                        {userr.err}
                    </Alert>
      )}
      {userr.success &&(
                    <Alert  variant="sucess" className="ppp">
                        {userr.success}
                    </Alert>
      )}
        <div className="button">
          <Link to="/newUser">
            <button className="userAddButton">Add</button>
          </Link>

          <Link to="/users">
            <button className="userListButton">User List</button>
          </Link>
        </div>
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={update}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={userr.user}
                  onChange={(e) => setUser({ ...userr, user: e.target.value })}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                readOnly
                  type="email"
                  placeholder="Anna@gmail.com"
                  value={userr.email}
                  onChange={(e) => setUser({ ...userr, email: e.target.value })}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Password</label>
                <input
                
                  type="password"
                  placeholder="......"
                  value={userr.password}
                  onChange={(e) =>
                    setUser({ ...userr, password: e.target.value })
                  }
                  className="userUpdateInput"
                />
              </div>


<div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={userr.phone}
                  onChange={(e) => setUser({ ...userr, phone: e.target.value })}
                  placeholder="+1 123 456 789"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Warehouse</label>
                <input
                  type="text"
                  placeholder="123"
                  value={userr.warehouse_id}
                  onChange={(e) =>
                    setUser({ ...userr, warehouse_id: e.target.value })
                  }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
              <label>Status : </label>
                <select value={userr.status} onChange={(e)=> setUser({...userr,status:e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="In_active">In_active</option>
                </select>
              </div>
            </div>

            <div className="userUpdateRight">
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
