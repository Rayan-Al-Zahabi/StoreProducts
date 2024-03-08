import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function Product() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete= async(id)=>{
    try {
        await axios.delete("http://localhost:3000/product/"+id)
        setProduct(product.filter(item => item.id !== id)); 
    } catch (err) {
        console.log(err)
    }
}
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link >
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Merchant Email</th>
              <th>Store</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {
            product.map((data,i)=>(
                <tr key={i}>
                    <td>{data.full_name}</td>
                    <td>{data.merchant_email}</td>
                    <td>{data.store_id}</td>
                    {/* <td>{data.image}</td> */}
                    {data.image && (
                    <img src={`http://localhost:3000/uploads/${data.image}`} alt="Product" style={{ width: '150px' }} />
                  )}
                    <td>
                        <Link to={`/update/${data.id}`} className="btn btn-primary ms-2">Update</Link>
                        <button className="btn btn-danger ms-2" onClick={e=>handleDelete(data.id)}>Delete</button>
                    </td>
                    
                </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
