import Chart from "../../components/chart/Chart"
import "../home/Home.css"
import { useEffect , useState } from "react"
import axios from "axios";
import {salesData} from "../../dummyData"
export default function Home() {
  const [send, setSend] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
});
  useEffect(() => {
    setSend({ ...send, loading: true });
    axios
      .get("http://localhost:4000/supervisor/homeuser",{
        headers: {
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

  const [prod, setProd] = useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setProd({ ...prod, loading: true });
    axios
      .get("http://localhost:4000/supervisor/homeproduct",{
        headers: {
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
          err: "Something went wrong please try again..!!",
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div className="home">
  
      <Chart data={salesData} title="Sales Analytics" grid dataKey="sales" />
      <div className=" homeWidgets">
      <br></br>
      <h1>Recently User</h1>
      <br></br>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Number</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>UserID</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Warehouse_ID</th>
              </tr>
            </thead>
            <tbody>
            {send.results.map((item, index) => {
              return (
                <tr key={item.n}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.user}</td>  
                  <td>{item.id}</td>  
                  <td>{item.email}</td>   
                  <td>{item.status}</td>
                  <td>{item.warehouse_id}</td>
                </tr>
              );
            })}
          </tbody>
            </table>
            <br></br>
            <h1>Product recently added</h1>
          <br></br>
            <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Number</th>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>ProductID</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
            {prod.result.map((item, index) => {
              return (
                <tr key={item.n}>
                  <th scope="row">{index + 1}</th>
                  <td> <img className="productListImg" alt="" src={item.image}/> </td>
                  <td>{item.name}</td>    
                  <td>{item.id}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
          </table>
      </div>
    </div>
  )
}
