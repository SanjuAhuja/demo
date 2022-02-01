import React, {useEffect} from 'react';
import { Card } from 'react-bootstrap';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { listProducts } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';

const SliderScreen = ()=> {

      const responsive = {
          0: { items: 1 },
          568: { items: 3 },
          1024: { items: 3 },
      };
      const dispatch = useDispatch();
      const productList = useSelector((state) => state.productList);
      const { products } = productList;
      
      
      useEffect(() =>{
        dispatch(listProducts());
      }, [dispatch])
      
      return (
        <>
        <h3></h3>
        <AliceCarousel responsive={responsive} 
            disableButtonsControls={true} 
            disableDotsControls={true} 
            autoPlay={true} infinite={true} 
            autoPlayInterval={1800}>
                {
                    products && products.map((obj) => {
                        return(
                            <Card key={obj._id} className='com-md-12 col-12'>
                                 <Card.Img variant="top" height='200' src={obj.slider} alt={obj.name}/>
                            </Card>
                        )
                    })
                }
          </AliceCarousel>
            </>
      ) 
  }

export default SliderScreen;