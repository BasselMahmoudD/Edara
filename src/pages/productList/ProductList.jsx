// import "../warehouseList/warehouseList.css"
// import "./product.css"   
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify" ;
import axios from "axios";

export default function ProductList() {
    const [data , setData] = useState([]);  
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:4000/products/listproduct");
        setData(response.data);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        loadData();
    } , []);

    const deleteProduct=(id) =>{
        if(window.confirm("Are you sure you want to delete ?")
        ){
            axios.delete(`http://localhost:4000/products/${id}`);
            toast.success("Product deleted");
            setTimeout(()=>loadData(),500); 
        }
    }

  return (
    <div className="WarehouseList">
  
  <div className="warehouseContainer">
        <h1 className="warehouseTitle"> Products </h1>
        <Link to="/newProduct">
        <button className="warehouseAddButton">Add</button>
        </Link>
      </div>


      <div className='whList'>
      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>Number</th>
                <th style={{textAlign: "center"}}>Image</th>
                <th style={{textAlign: "center"}}>Name</th>
                <th style={{textAlign: "center"}}>ID</th>
                <th style={{textAlign: "center"}}>Description</th>
                <th style={{textAlign: "center"}}>WarehouseID</th>
                <th style={{textAlign: "center"}}>Quantity</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item , index) => {
                return (
                    <tr key={item.number}> 
                        <th scope="row">{index+1}</th>
                        {/* <td>{item.number}</td> */}
                        <td> <img className="productListImg" src={item.image} alt=""/> </td>
                        <td>{item.name}</td>

                        <td>{item.id}</td>
                        <td>{item.description}</td>
                        <td>{item.warehouse_id}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <Link to={`/product/${item.id}`}>  
                                <button className="btn btn-edit">Edit</button>
                            </Link>

            
                             <button className="btn btn-delete" onClick={() => deleteProduct(item.id)}>Delete</button>

                    
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