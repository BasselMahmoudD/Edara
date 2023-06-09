/* eslint-disable jsx-a11y/heading-has-content */
import "./newUser.css";
import { useState } from "react";
import axios from "axios";        
import { GetAuthUser } from "../../helper/storage";
import Alert from 'react-bootstrap/Alert'

export default function NewUser() {
    const auth = GetAuthUser();
    const [users , setUser] = useState({
        user: "",
        email: "",
        password: "",
        status:"",
        phone:"",
        warehouse_id: "",
        loading: false,
        err: null,  
        successMsg: null,
  });
  const newUser = (e)=> {
    e.preventDefault();
    setUser({...users, loading: true });

    const formData = new FormData();
    formData.append("user", users.user);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("status", users.status);
    formData.append("phone", users.phone);
    formData.append("warehouse_id", users.warehouse_id);
    

    axios.post("http://localhost:4000/user" ,formData,{
      headers: {
        token : auth.token ,
        "Content-Type": "application/json"
      }
    })
      .then((resp) =>{
        
        setUser({
          user: "",
          email: "",
          password:"",
          phone: "",
          status: "",
          warehouse_id: "",
          loading: false,
          err: null,
          successMsg: "New user added successfully..!!",
        })
        
      })
      .catch((err) => {
        setUser({
          ...users,
          loading: false,
          err: "Something went wrong or Warehouse already assigned..!!",
          successMsg: null,
        });
      });
  };


  return (
    <div className="newUser">
        <h1 className="newUserTitle">New User </h1>
        {users.err &&(
                    <Alert  variant="danger" className="ppp">
                        {users.err}
                    </Alert>
      )}
      {users.successMsg &&(
                    <Alert  variant="sucess" className="ppp">
                        {users.successMsg}
                    </Alert>
      )}
        <form className="newUserForm" onSubmit={newUser}>
            <div className="newUserItem">
                <label>User name</label>
                <input type="text" placeholder="john" 
                    value={users.user}
                    onChange={(e) => setUser({...users , user: e.target.value})}
                />      
            </div>

            <div className="newUserItem">
                <label>Email</label>
                <input type="text" placeholder="john@gmail.com" 
                    value={users.email}
                    onChange={(e) => setUser({...users , email: e.target.value})}
                />        
            </div>

            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder="password"
                    value={users.password}
                    onChange={(e) => setUser({...users, password: e.target.value})}
                />
            </div>

            

            <div className="newUserItem">
                <label>Phone</label>
                <input type="text" placeholder="(+2)01234567890"
                    value={users.phone}
                    onChange={(e) => setUser({...users , phone: e.target.value})}
                /> 
            </div>

            <div className="newUserItem">
                <label>Warehouse_ID</label>
                <input type="text" placeholder="123"
                    value={users.warehouse_id}
                    onChange={(e) => setUser({...users , warehouse_id: e.target.value})}
                /> 
            </div>
            
            <button className="newUserButton" type="submit">Create</button>
        </form>   
    </div>
  )
}
