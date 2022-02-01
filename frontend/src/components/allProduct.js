import React from "react";
import { Link } from 'react-router-dom';
import Rating from "./rating";

export default function Product(props) {
    const { allProducts } = props
    return (
        <div key={allProducts._id} className="card">
        <Link to={`/product/${allProducts._id}`}>
            <img className="medium" src={allProducts.image} alt={allProducts.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${allProducts._id}`}>
                <h2>{allProducts.name}</h2>
            </Link>
            <Rating rating={allProducts.rating} numReviews={allProducts.numReview}></Rating> 
            <div className="row">
            <div className="price">
                ${allProducts.price}
            </div>
            <div>           
            </div>
            </div>                     
        </div>
    </div>    
    )
}