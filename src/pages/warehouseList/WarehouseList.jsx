import "./warehouseList.css"
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify" ;
import axios from "axios";

export default function WarehouseList() {
    const [data , setData] = useState([]);
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:4000/warehouse");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    } , []);

    const deleteWarehouse=(id) =>{
        if(window.confirm("Are you sure you want to delete ?")
        ){
            axios.delete(`http://localhost:4000/warehouse/${id}`);
            toast.success("warehouse deleted");
            setTimeout(()=>loadData(),500);
        }
    }

  return (
    <div className="WarehouseList">
  
  <div className="warehouseContainer">
        <h1 className="warehouseTitle"> Warehouses </h1>
        <Link to="/newWarehouse">
        <button className="warehouseAddButton">Add</button>
        </Link>
      </div>


      <div className='whList'>
      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>Number</th>
                <th style={{textAlign: "center"}}>Name</th>
                <th style={{textAlign: "center"}}>Location</th>
                <th style={{textAlign: "center"}}>Status</th>
                <th style={{textAlign: "center"}}>WarehouseID</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item , index) => {
                return (
                    <tr key={item.id}> 
                        <th scope="row">{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.status}</td>
                        <td>{item.id}</td>
                        <td>
                            <Link to={`/warehouse/${item.id}`}>  
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