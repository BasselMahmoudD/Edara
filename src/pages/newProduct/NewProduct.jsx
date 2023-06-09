import "./newProduct.css"
import {useRef, useState} from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


export default function NewProduct() {
        const [product , setProduct] = useState({
          name:"",
          description:"",
          warehouse_id:"",
          loading : false,
          err : "",
          successMsg : ""
      });
      const image = useRef(null);
    
      const createProduct = (e)=>{
        e.preventDefault();
        setProduct({...product , loading:true})
          const formData= new FormData();
          formData.append("name",product.name);
          formData.append("description",product.description);
          formData.append("warehouse_id",product.warehouse_id); 
          formData.append("quantity",product.quantity); 
          if(image.current.files && image.current.files[0]){
            formData.append("image" , image.current.files[0])
          }
          axios.post("http://localhost:4000/products/create_product" , formData,{})
            .then((resp) => {
                setProduct({
                  name:"",
                  warehouse_id:"",
                  quantity:"",
                  description:"",
                  loading : false,
                  err : null,
                  successMsg : "Product created successfully"
              })
              image.current.files=null;
            })
            .catch((err) => {
                setProduct({
                  ...product,
                  loading : false,
                  err : "Something wrong with your data",
                  successMsg : null
                })
              })
        }
  return (
    <div className='newProduct'>
        <h1 className="addProductTitle">New Product</h1>

      {product.err &&(
                    <Alert  variant="danger" className="ppp">
                        {product.err}
                    </Alert>
      )}
      {product.successMsg &&(
                    <Alert  variant="sucess" className="ppp">
                        {product.successMsg}
                    </Alert>
      )}

        <form className="newProductForm" onSubmit={createProduct}>
            

            <div className="addProductItem">
                <label>Name</label>
                <input type="text" placeholder="clothes" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
            </div>

            <div className="addProductItem">
                <label>Description</label>
                <input type="text" placeholder="..." value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}/>
            </div>
            
            <div className="addProductItem">
                <label>WarehouseID</label>
                <input type="text" placeholder="123" value={product.warehouse_id} onChange={(e)=>setProduct({...product,warehouse_id:e.target.value})}/>
            </div>

            <div className="addProductItem">
                <label>Quantity</label>
                <input type="text" placeholder="123" value={product.quantity} onChange={(e)=>setProduct({...product,quantity:e.target.value})}/>
            </div>

            <div className="addProductItem">
                <label  className="img">Image</label>
                <input type="file" id="file" ref={image}/>      
            </div>

           

            <button className="addProductButton" type="submit">Create</button>
       </form>
    </div>
  )

}