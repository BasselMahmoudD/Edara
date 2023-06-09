/* eslint-disable jsx-a11y/alt-text */
import "./supervisor.css";
import "../product/product.css";
import "../productList/productList.css"
import { useState, useEffect } from "react";
import { GetAuthUser } from "../../helper/storage.js";
import axios from "axios";

export default function Supervisor() {
  const auth = GetAuthUser();
  const [send, setSend] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
});
  useEffect(() => {
    setSend({ ...send, loading: true });
    axios
      .get("http://localhost:4000/supervisor/reciveinfo",{
        headers: {
          token : auth.token ,
          "Content-Type": "application/json"
        }
      })
      .then((resp) => {
        setSend({ ...send, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setSend({
          ...send,
          loading: false, 
          err: "Please check your information",
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  //product
  const [prod, setProd] = useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setProd({ ...prod, loading: true });
    axios
      .get("http://localhost:4000/supervisor/prodinfo",{
        headers: {
          token : auth.token ,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((resp) => {
        setProd({ ...prod, result: resp.data, loading: false,  err: null });
      })
      .catch((err) => {
        setProd({
          ...prod,
          loading: false, 
          err: "Something went wrong please try again in another time..!!",
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    
    <div className="supervisor">
      <div className="ProductTitleContainer">
        <h1 className="ProductTitle"> Warehouse </h1>
      </div>
      

      <div className="requests">
        <div className="requestItems">
          <div className="styled-table">
            <div>
            {send.results.map((item, index) => {
              return (     
                  <div className="kk">
                      <h3 style={{ textAlign: "left" }}>Name : </h3>
                      <h3 style={{ textAlign: "center" }}>{item.name}</h3>  
                      <h3 style={{ textAlign: "left" }}>Location</h3>  
                      <h3 style={{ textAlign: "center" }}>{item.location}</h3> 
                      <h3 style={{ textAlign: "left" }}>Warehouse_ID</h3>  
                      <h3 style={{ textAlign: "center" }}>{item.id}</h3>
                  </div>
              );
            })}
          </div>
          
          </div>

          <div className="ProductTitleContainer">
            <h1 className="ProductTitle"> Products </h1>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Number</th>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>ProductID</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
            {prod.result.map((item, index) => {
              return (
                <tr key={item.n}>
                  <th scope="row">{index + 1}</th>
                  <td> <img className="productListImg" src={item.image}/> </td>
                  <td>{item.name}</td>    
                  <td>{item.description}</td>   
                  <td>{item.id}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
          



    </div>
  );
}
