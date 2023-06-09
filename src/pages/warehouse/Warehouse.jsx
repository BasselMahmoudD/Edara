
/* eslint-disable react-hooks/rules-of-hooks */
// import "./user.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState , useEffect} from "react";
import Alert from 'react-bootstrap/Alert'

export default function UpdateWarehouse() {
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [info, setInfo] = useState({
    name: "",
    location: "",
    status:"",
    loading: false,
    err: "",
    result: [],
    success: "",
    reload: false,
  });

  const update = (e) => {
    e.preventDefault();
    setInfo({ ...info, loading: true });
    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("location", info.location);
    formData.append("status", info.status);
    axios
      .put("http://localhost:4000/warehouse/" + id, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setInfo({
          ...info,
          loading: false,
          success:"warehouse updated successfully",
          err:null,
        });
      })
      .catch((err) => {
        setInfo({
          ...info,
          loading: false,
          err: "Please check your information",
          success: null,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/warehouse/" + id)
      .then((resp) => {
        setInfo({
          ...info,
          name: resp.data.name,
          location: resp.data.location,
          status:resp.data.status,
        });
      })
      .catch((err) => {
        setInfo({
          ...info,
          loading: false,
          err: "something wrong",
          successMsg: null,
        });
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.reload]);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle"> Edit Warehouse</h1>
      {info.err &&(
                    <Alert  variant="danger" className="ppp">
                        {info.err}
                    </Alert>
      )}
      {info.success &&(
                    <Alert  variant="sucess" className="ppp">
                        {info.success}
                    </Alert>
      )}
        <div className="button">
          <Link to="/newWarehouse">
            <button className="userAddButton">Add</button>
          </Link>

          <Link to="/warehouses">
            <button className="userListButton">Warehouse List</button>
          </Link>
        </div>
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={update}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>location</label>
                <input
                  type="text"
                  placeholder="Ain Shams"
                  value={info.location}
                  onChange={(e) => setInfo({ ...info, location: e.target.value })}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
              <label>Status : </label>
                <select value={info.status} onChange={(e)=> setInfo({...info,status:e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="In_active">Inactive</option>
                </select>
              </div>
            </div>

            <div className="userUpdateRight">
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
