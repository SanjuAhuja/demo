import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { createProduct } from "../actions/productActions";
import {
    PRODUCT_CREATE_RESET,
  } from '../constants/productConstants';

const NewProductScreen = (props) => {
    const [formData, setFormData] = useState({});
  

  
    const submitHandler = () => {
        const data = {
            name: formData.name,
            price: formData.price,
            image: formData.image,
            countInStock: formData.countInStock,
            rating: formData.rating,
            category: formData.category,
            brand: formData.brand,
            description: formData.description
        }
        axios.post(`http://localhost:5000/api/products/`, data).then(res => {
          if(res.status == 200) {
            setFormData(data);
            alert('New Product Created')
            props.history.push(`/productlist`) 
          } 
          else {
              alert('Product not created')
          }   
            
    
}) 
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({ ...values, [name]: value }))
    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post('/api/uploads', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Sanju ${userInfo.token}`,
          },
        });
        //setImage(data);
        setFormData(values => ({ ...values, image: data }));
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    };

   
    return (
        <>
            <div>
              <form className="form" onSubmit={submitHandler}>
              <div>
                <h1>New Product</h1>
              </div>
                            <div>
                            <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="price">Price</label>
                            <input
                                    id="price"
                                    type="text"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                    id="imageFile"
                                    type="file"
                                    label="Choose Image"
                                    onChange={uploadFileHandler}
                                />  
                            </div>
                            <div>
                            <label htmlFor="category">Category</label>
                            <input
                                    id="category"
                                    type="text"
                                    placeholder="Enter category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="brand">Brand</label>
                            <input
                                    id="brand"
                                    type="text"
                                    placeholder="Enter brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input
                                    id="countInStock"
                                    type="text"
                                    placeholder="Enter countInStock"
                                    value={formData.countInStock}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="rating">Rating</label>
                            <input
                                    id="rating"
                                    type="text"
                                    placeholder="Enter rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label htmlFor="description">Description</label>
                            <input
                                    id="description"
                                    type="text"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label></label>
                                <button className="primary" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>                           
                   
            </div>
        </>
    )
}

export default NewProductScreen;