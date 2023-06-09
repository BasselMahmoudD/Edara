

import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify" ;
import axios from "axios";



export default function UserList() {
    
    const [data , setData] = useState([]);
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:4000/user");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    } , []);

    const deleteWarehouse=(id) =>{
        if(window.confirm("Are you sure you want to delete ?")
        ){
            axios.delete(`http://localhost:4000/user/${id}`);
            toast.success("warehouse deleted");
            setTimeout(()=>loadData(),500);
        }
    }



  return (
      <div className="requests">
         
      <div className="userTitleContainer">
        <h1 className="userTitle"> Supervisor</h1>
        <Link to="/newUser">
        <button className="userAddButton">Add</button>
        </Link>
      </div>
      <div className="requestItems">
      <table className="styled-table">
        <thead>
            <tr>
                <th >Number</th>
                <th >Name</th>
                <th >ID</th> 
                <th >Email</th>
                <th >Phone</th>
                <th >Status</th>
                <th >Warehouse Id</th>
                <th >Action</th>

            </tr>
        </thead>
        <tbody>
            {data.map((item , index) => {
                return (
                    <tr key={item.n}> 
                        <th scope="row">{index+1}</th>
                        {/* <td>{item.n}</td> */}
                        <td>{item.user}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.status}</td>
                        <td>{item.warehouse_id}</td>


                        <td>
                            <Link to={`/users/${item.id}`}>  
                                <button className="btn btn-edit">Edit</button>
                            </Link>

            
                             <button className="btn btn-delete" onClick={() => deleteWarehouse(item.id)}>Delete</button>

                    
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
        </div>
      </div>
  )
}