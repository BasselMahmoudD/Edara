import "./newWarehouse.css";
import { useState } from "react";
import axios from "axios";        
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GetAuthUser } from "../../helper/storage";
import Alert from 'react-bootstrap/Alert'
const NewWarehouse = () => {
  const auth = GetAuthUser();
  const [ware , setWare] = useState({
    name: "",
    location: "",
    status: "",
    loading: false,
    err: null,
    successMsg: null,
  });

  const createNew = (e)=> {
    e.preventDefault();
    setWare({...ware, loading: true });

    const formData = new FormData();
    formData.append("name", ware.name);
    formData.append("location", ware.location);
    formData.append("status", ware.status);

    axios.post("http://localhost:4000/warehouse/wh" , formData, {
      headers: {
        token : auth.token ,
        "Content-Type": "application/json"
      }
    })
      .then((resp) =>{
        setWare({
          name: "",
          location: "",
          status: "",
          loading: false,
          err: null,
          successMsg: "Warehouse created successfully..!!",
        })
      })
      .catch((err) => {
        setWare({
          ...ware,
          loading: false,
          err: "Something went wrong please try again in another time..!!",
          successMsg: null,
        });
      });
  };

  return (
    <div className="newWarehouse">
      <h1 className="addWarehouseTitle">New Warehouse</h1>
      {ware.err &&(
                    <Alert  variant="danger" className="ppp">
                        {ware.err}
                    </Alert>
      )}
      {ware.successMsg &&(
                    <Alert  variant="sucess" className="ppp">
                        {ware.successMsg}
                    </Alert>
      )}
      <Form 
      onSubmit={createNew} >
        <div className="addWarehouseItem">
          <label>Name</label>
          <input
            required
            type="text"
            placeholder="Wh1"
            value={ware.name}
            onChange={(e) => setWare({...ware , name: e.target.value})}
          />
        </div>

        <div className="addWarehouseItem">
          <label>Location</label>
          <input
            required
            type="text"
            placeholder="location"
            value={ware.location}
            onChange={(e) => setWare({...ware , location: e.target.value})}
          />
        </div>


        <div className='fButton'>
              <button type="submit"  disabled = {ware.loading === true}> Create!! </button>
        </div>
      </Form>
    </div>
  );
};


export default NewWarehouse;
