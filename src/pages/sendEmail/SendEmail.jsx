import "./sendEmail.css";
import { useState } from "react";
import axios from "axios";        
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GetAuthUser } from "../../helper/storage.js";
import Alert from 'react-bootstrap/Alert'
const SendEmail = () => {
  const auth = GetAuthUser();
  const [send , setsend] = useState({
    email: "",
    message: "",
    product_id:"",
    quantity:"",
    warehouse_id:"",
    transaction:"",
    loading: false,
    err: null,
    successMsg: null,
  });

  const createNew = (e)=> {
    e.preventDefault();
    setsend({...send, loading: true });

    const formData = new FormData();
    formData.append("email", send.email);
    formData.append("message", send.message);
    formData.append("product_id", send.product_id);
    formData.append("quantity", send.quantity);
    formData.append("warehouse_id", send.warehouse_id);
    formData.append("transaction", send.transaction);

    axios.post("http://localhost:4000/mail/send" , formData, {
      headers: {
        token : auth.token ,
        "Content-Type": "application/json"
      }
    })
      .then((resp) =>{
        setsend({
          name: "",
          location: "",
          status: "",
          product_id:"",
          quantity:"",
          warehouse_id:"",
          transaction:"",
          loading: false,
          err: null,
          successMsg: "Email send successfully..!!",
        })
      })
      .catch((err) => {
        setsend({
          ...send,
          loading: false,
          err: "Something went wrong !!",
          successMsg: null,
        });
      });
  };

  return (
    <div className="newWarehouse">
      <h1 className="addWarehouseTitle">Send Mail</h1>
      {send.err &&(
                    <Alert  variant="danger" className="ppp">
                        {send.err}
                    </Alert>
      )}
      {send.successMsg &&(
                    <Alert  variant="sucess" className="ppp">
                        {send.successMsg}
                    </Alert>
      )}
      <Form 
      onSubmit={createNew} >
        <div className="addWarehouseItem">
          <label>Email</label>
          <input
            required
            type="email"
            placeholder="email"
            value={send.email}
            onChange={(e) => setsend({...send , email: e.target.value})}
          />
        </div>

        <div className="addWarehouseItem">
          <label>Message</label>
          <input
            required
            type="text"
            placeholder="write a message"
            value={send.message}
            onChange={(e) => setsend({...send , message: e.target.value})}
          />
        </div>
        <div className="addWarehouseItem">
          <label>ProductID</label>
          <input
            required
            type="text"
            placeholder="1"
            value={send.product_id}
            onChange={(e) => setsend({...send , product_id: e.target.value})}
          />
        </div>
        <div className="addWarehouseItem">
          <label>Quantity</label>
          <input
            required
            type="text"
            placeholder="5"
            value={send.quantity}
            onChange={(e) => setsend({...send , quantity: e.target.value})}
          />
        </div>

        <div className="addWarehouseItem">
          <label>WarehouseID</label>
          <input
            required
            type="text"
            placeholder="5"
            value={send.warehouse_id}
            onChange={(e) => setsend({...send , warehouse_id: e.target.value})}
          />
        </div>
        <div className="userUpdateItem">
              <label>Transaction : </label>
                <select value={send.transaction} onChange={(e)=> setsend({...send,transaction:e.target.value})}>
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
              </div>
       

        <div className='fButton'>
              <button type="submit"  disabled = {send.loading === true}> Send!! </button>
        </div>
      </Form>
    </div>
  );
};


export default SendEmail;
