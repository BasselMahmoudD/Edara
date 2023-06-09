import "./requests.css";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { GetAuthUser } from "../../helper/storage.js";

import axios from "axios";

export default function Requests() {
  const auth = GetAuthUser();

  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:4000/mail/recivesuper" , {
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

 

  return (
    <div className="requests">
      <h1>Requests</h1>
      <div className="requestItems">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Number</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Message</th>
              <th style={{ textAlign: "center" }}>ProductID</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>Response</th>
              <th style={{ textAlign: "center" }}>WarehouseID</th>
              <th style={{ textAlign: "center" }}>Transaction</th>
    
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <b><td>{item.response}</td></b>
                  <td>{item.warehouse_id}</td>
                  <b><td>{item.transaction}</td></b>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
