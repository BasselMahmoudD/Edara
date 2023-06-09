// import "./mail.css";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

import { GetAuthUser } from "../../helper/storage.js";

import axios from "axios";


export default function Mail() {
  // const { id } = useParams();
  const auth = GetAuthUser();

  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:4000/mail/recive" , {
        headers: {
          token : auth.token ,
          "Content-Type": "application/json"
        }
      });
    setData(response.data);
  };
 
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleClickAccept=(id) =>{
        axios.put(`http://localhost:4000/mail/${id}` , {response : 'accepted'});
        toast.success("email accepted");
        setTimeout(()=>loadData(),500); 
}
const deletMail=(id) =>{
      axios.delete(`http://localhost:4000/mail/${id}`);
      toast.success("email accepted");
      setTimeout(()=>loadData(),500); 
}
const handleClickDeline=(id) =>{
      axios.put(`http://localhost:4000/mail/${id}` , {response : 'Declined'});
      toast.success("email declined");
      setTimeout(()=>loadData(),500); 
}



  return (
    <div className="requests">
      <h1>Mails</h1>
      <div className="requestItems">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Number</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Message</th>
              <th style={{ textAlign: "center" }}>ProductID</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>WarehouseID</th>
              <th style={{ textAlign: "center" }}>Transaction</th>
              <th style={{ textAlign: "center" }}>Action</th>
    
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.e}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>{item.warehouse_id}</td>
                  <td>{item.transaction}</td>
                  <td>
                    <form  >
                    <button onClick={() => handleClickAccept(item.id) } className="btn btn-edit">Aceepted</button>
                    <button onClick={() => handleClickDeline(item.id) } className="btn btn-edit">Decline</button>
                    <button onClick={() => deletMail(item.id) } className="btn-delete">Delete</button>
                    </form>
                  </td>

                 
                </tr> 
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
