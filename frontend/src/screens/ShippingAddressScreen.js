import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
   
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);
    
    const userAddressMap = useSelector((state) => state.userAddressMap);
    const { address: addressMap } = userAddressMap;

    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postelCode, setPostelCode] = useState(shippingAddress.postelCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler =(e) => {
        e.preventDefault();
        const newlat = addressMap ? addressMap.lat : lat;
        const newlng = addressMap ? addressMap.lng : lng;
        if(addressMap) {
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }
        let moveOn = true;
        if(!newlat || !newlng) {
            moveOn = window.confirm('You did not set your location on map. Continue?');
        }
        if(moveOn) {
            dispatch(
                saveShippingAddress({fullName, address, city, postelCode, country, lat: newlat, lng: newlng})
            );
            props.history.push('/placeorder');
        }       
    };

    const chooseOnMap = () => {
        dispatch(saveShippingAddress({
            fullName, address, city, postelCode, country, lat, lng
        }));
        props.history.push('/map');
    };

    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        placeholder="Enter Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        placeholder="Enter Address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder="Enter City" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postelCode">Postel Code</label>
                    <input 
                        type="text" 
                        id="postelCode" 
                        placeholder="Enter postel Code" 
                        value={postelCode} 
                        onChange={(e) => setPostelCode(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                        type="text" 
                        id="country" 
                        placeholder="Enter country" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="chooseOnMap">Location</label>
                    <button type="button" onClick={chooseOnMap}>
                        Choose On Map
                    </button>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}