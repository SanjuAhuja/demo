import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderContants";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from "axios";
import Razorpay from 'razorpay';
import { useHistory } from "react-router-dom";
import { set } from "mongoose";
import { Card } from "react-bootstrap";

export default function PlaceOrderScreen(props) {
    const history = useHistory();
    const [formData, setFormData] = useState();
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemPrice > 100 ? toPrice(0) : toPrice(1);
    cart.taxPrice = toPrice(0.15 * cart.itemPrice);
    cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;
    cart.fullName = cart.shippingAddress.fullName;
    cart.address =  cart.shippingAddress.address;
    cart.city = cart.shippingAddress.city;
    cart.postalCode = cart.shippingAddress.postalCode;
    cart.country = cart.shippingAddress.country;
  
    const dispatch = useDispatch();

    const paymentHandler = (e) => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems, shippingAddress: cart.shippingAddress }));
     };

    useEffect(() => {
        if(success)
        {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},  {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        
                        <li>
                        <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                            {
                                cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                             </div>
                                             
                                             <div>
                                                 {item.qty} x ${item.price} = ${item.qty * item.price}
                                             </div>
                                           
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Items</div>
                                        <div>${cart.itemPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>${cart.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>${cart.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong> Order Total</strong></div>
                                        <div>
                                            <strong>
                                                ${cart.totalPrice.toFixed(2)}
                                            </strong>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button 
                                        type="submit" 
                                        onClick={paymentHandler} 
                                        className="course-payment-button"
                                       >
                                        Place Order
                                    </button>
                                </li>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}