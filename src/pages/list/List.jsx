import "./list.css" ;
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
// import {toast} from "react-toastify" ;
import axios from "axios";

export default function List() {
    const [data , setData] = useState([]);
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:4000/warehouse/whlist");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    } , []);

  return (
    <div className='list'>
      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>ID</th>
                <th style={{textAlign: "center"}}>Name</th>
                <th style={{textAlign: "center"}}>Location</th>
                <th style={{textAlign: "center"}}>Status</th>
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
                        <td>
                            <Link to={`/warehouse/:warehousesId//${item.id}`}>
                                <button className="btn btn-edit">Edit</button>
                            </Link>

            
                                <button className="btn btn-delete">Delete</button>

                    
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

