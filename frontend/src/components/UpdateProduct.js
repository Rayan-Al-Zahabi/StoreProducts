import axios from 'axios';
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct(){
    const [fullname, setFullname]=useState('')
    const [merchantemail,setMerchantemail]=useState('')
    const [storeid,setStoreid]=useState('')
    const [storeLocations, setStoreLocations] = useState([]);
    const [image, setImage] = useState(null);
    const{id}=useParams();
    const navigate=useNavigate();

    useEffect(() => {
        // Fetch store locations from backend
        axios.get('http://localhost:3000/storeLocations')
            .then(res => {
                console.log(res.data);
                setStoreLocations(res.data); 
            })
            .catch(err => console.log(err));

        // Fetch product details
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                console.log(res.data);
                const { full_name, merchant_email, store_id, image } = res.data;
                setFullname(full_name);
                setMerchantemail(merchant_email);
                setStoreid(store_id);
                setImage(image);
                        
            })
            .catch(err => console.log(err));
    }, [id]);

    const imageUrl = image ? `http://localhost:3000/uploads/${image}` : null;

    function handleImageChange(e) {
        const selectedImage = e.target.files[0];
        console.log(selectedImage)
        if (selectedImage) {
        setImage(e.target.files[0]);
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        document.getElementById('preview').setAttribute('src', imageUrl);}
    }
    

    function handleSubmit(event){
        event.preventDefault();

        // Prepare form data
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('merchantemail', merchantemail);
        formData.append('storeid', storeid);
        formData.append('image', image);

        axios.put(`http://localhost:3000/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log(res);
            navigate('/');
        }).catch(err=> console.log(err));
    }
    function handleCancel() {
        navigate(-1); 
    }
    return(
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
           <form onSubmit={handleSubmit}>
           <h2>Update Product</h2>
           <div className="mb-2">
                <label htmlFor="">Product Name</label>
                <input type="text" value={fullname} placeholder="Enter name" className="form-control" onChange={e=>setFullname(e.target.value)}></input>
            </div>
            <div className="mb-2">
            <label htmlFor="">Merchant Email</label>
                <input type="email" value={merchantemail} placeholder="Enter email" className="form-control" onChange={e=>setMerchantemail(e.target.value)}></input>
            </div>
            <div className="mb-2">
            <label htmlFor="">Store</label>
                
                <select className="form-control" value={storeid} onChange={e => setStoreid(e.target.value)}>
                            <option value="">Select Store</option>
                            {storeLocations.map(store => (
                                <option key={store.id} value={store.id}>{store.location}</option>
                            ))}
                        </select>
            </div>
            <div className="mb-2">
                <label htmlFor="">Product Image</label>
                <input type="file" className="form-control"  onChange={handleImageChange} accept="image/*" required/>
                {image && <img id="preview" src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
            </div>
            <button className="btn btn-success">Submit</button>
            <button className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default UpdateProduct;