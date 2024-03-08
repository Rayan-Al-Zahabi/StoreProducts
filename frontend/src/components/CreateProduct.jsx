import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function CreateProduct(){
    const [fullname, setFullname]=useState('')
    const [merchantemail,setMerchantemail]=useState('')
    const [storeid,setStoreid]=useState('')
    const [storeLocations, setStoreLocations] = useState([]);
    const [image, setImage] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        // Fetch store locations from backend
        axios.get('http://localhost:3000/storeLocations')
            .then(res => {
                console.log(res.data);
                setStoreLocations(res.data); 
            })
            .catch(err => console.log(err));
    }, []);


    function handleSubmit(event){
        event.preventDefault();

        if (!fullname || !merchantemail || !storeid || !image) {
            alert('Please fill out all required fields');
            return;
        }
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('merchantemail', merchantemail);
        formData.append('storeid', storeid);
        formData.append('image', image);

        axios.post('http://localhost:3000/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log(res);
            navigate('/product');
        }).catch(err=> console.log(err));
    }

    function handleImageChange(e) {
        console.log(e.target.files);
        setImage(e.target.files[0]);
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        document.getElementById('preview').setAttribute('src', imageUrl);
    }

  

    return(
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
           <form onSubmit={handleSubmit}>
           <h2>Add Product</h2>
           <div className="mb-2">
                <label htmlFor="">Product Name</label>
                <input type="text" placeholder="Enter name" className="form-control" onChange={e=>setFullname(e.target.value)} required></input>
            </div>
            <div className="mb-2">
            <label htmlFor="">Merchant Email</label>
                <input type="email" placeholder="Enter email" className="form-control" onChange={e=>setMerchantemail(e.target.value)} required></input>
            </div>
            <div className="mb-2">
            <label htmlFor="">Store</label>
                
                <select className="form-control" onChange={e => setStoreid(e.target.value)} required>
                            <option value="">Select Store</option>
                            {storeLocations.map(store => (
                                <option key={store.id} value={store.id}>{store.location}</option>
                            ))}
                        </select>
            </div>
            <div className="mb-2">
                        <label htmlFor="">Product Image</label>
                        <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" required/>
                        {/* <img src={image} /> */}
                        <img id="preview" src="#" alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
            <button className="btn btn-success">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default CreateProduct;