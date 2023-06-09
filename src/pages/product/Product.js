/* eslint-disable react-hooks/exhaustive-deps */
// import "./newProduct.css"
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    warehouse_id: "",
    quantity: "",
    loading: false,
    err: "",
    successMsg: "",
    reload: false,
  });
  const image = useRef(null);

   

  const Edit = (e) => {
    e.preventDefault();
    setProduct({ ...product, loading: true });
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("warehouse_id", product.warehouse_id);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .put("http://localhost:4000/products/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          ...product,
          successMsg: "Product Updated Successfully",
        })
      })
      .catch((err) => {
        setProduct({
          ...product,
          loading: false,
          err: "Something wrong with your data",
          successMsg: null,
        });
      });
  };
  
  useEffect(() => { 
    axios
      .get("http://localhost:4000/products/" + id )
      .then((resp) => {
        setProduct({
          ...product,
          name: resp.data.name,
          description: resp.data.description,
          quantity: resp.data.quantity,
          warehouse_id: resp.data.warehouse_id,
          image: resp.data.image,
        });
      })
      .catch((err) => {
        setProduct({
          ...product,
          loading: false,
          err: "Something wrong with your data",
          successMsg: null,
        });
      });
    
  }, [product.reload]);

  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Edit Product</h1>

      {product.err && (
        <Alert variant="danger" className="ppp">
          {product.err}
        </Alert>
      )}
      {product.successMsg && (
        <Alert variant="sucess" className="ppp">
          {product.successMsg}
        </Alert>
      )}

      <form className="newProductForm" onSubmit={Edit}>
        <div className="addProductItem">
          <label>Name</label>
          <input   
            type="text"
            
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            // placeholder="..."
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        <div className="addProductItem">
          <label>WarehouseID</label>
          <input
            type="text"
            // placeholder="123"
            value={product.warehouse_id}
            onChange={(e) =>
              setProduct({ ...product, warehouse_id: e.target.value })
            }
          />
        </div>

        <div className="addProductItem">
          <label>Quantity</label>
          <input
            type="text"
            // placeholder="123"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
          />
        </div>

        <div className="addProductItem">
          <label className="img">Image</label>
          <input type="file" id="file" ref={image} />
        </div>

        <button className="addProductButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
