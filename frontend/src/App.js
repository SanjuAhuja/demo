import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SearchBox from './components/SearchBox';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SliderScreen from './screens/SliderScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import ThankyouScreen from './screens/ThankyouScreen';
import NewProductScreen from './screens/NewProductScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>    
    <div className='grid-container'>
    <header className="row">
        <div>
           <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}>
           <i className="fa fa-bars"></i>
           </button>
            <Link className="brand" to="/">yashhealth</Link>
        </div>
        <div>
          <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>
        </div>
        <div>
            <Link to="/cart">Cart 
            {
              cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )
            }
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                <Link to="#">
                  {userInfo.name}<i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                  </li>
                </ul>
                </div>
              ) :
              (
                <Link to="/signin">Sign In</Link>
              )} 
              {userInfo && userInfo.isSeller && (
                 <div className="dropdown">
                 <Link to="#admin">
                   Seller <i className="fa fa-caret-down"></i>
                 </Link>
                 <ul className="dropdown-content">
                   <li>
                     <Link to="/productlist/seller">Products</Link>
                   </li>
                   <li>
                     <Link to="/orderlist/seller">orders</Link>
                   </li>
                 </ul>
               </div>
              )}
              {
                userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">orders</Link>
                      </li>
                      <li>
                        <Link to="/userlist">Users</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                    </ul>
                  </div>
                )
              }      
        </div>
    </header>
    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
    <main>  
      <Route path="/seller/:id" component={SellerScreen}></Route>   
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/slider" component={SliderScreen}></Route>
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
      <Route path="/newProduct" component={NewProductScreen} exact></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/thank-you" component={ThankyouScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
      <Route path="/search/category/:category?" component={SearchScreen} exact></Route>
      <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
      <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact></Route>
      <PrivateRoute 
        path="/profile" 
        component={ProfileScreen}
      ></PrivateRoute>
       <PrivateRoute 
        path="/map" 
        component={MapScreen}
      ></PrivateRoute>
      <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
      <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
      <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
      <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
      <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
      <AdminRoute path="/dashboard" component={DashBoardScreen}></AdminRoute>
      <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
      <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
      <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
      <Route path="/" component={HomeScreen} exact></Route>
    </main>
    <footer>
    {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        <div className='footer-distributed'> 
        <div className="footer-left">
          <img src="/yash.png" />
				<h3>About <span>Yashhealth</span></h3>

				<p className="footer-links">
					<a href="/">Home</a>
					|
					<a href="#">Blog</a>
					|
					<a href="#">About</a>
					|
					<a href="#">Contact</a>
				</p>

				<p className="footer-company-name">© 2021 Yashhealth Learning Solutions Pvt. Ltd.</p>
			</div>

			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
					  <p><span>309 - Rupa Solitaire,
						 Bldg. No. A - 1, Sector - 1</span>
						Mahape, Navi Mumbai - 400710</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+91 22-27782183</p>
				</div>
				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@eduonix.com">support@yashhealth.com</a></p>
				</div>
			</div>
			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the company</span>
          Yash Healthcare delivers a very good quality nursing care support all over in Mumbai as well as Maharashtra.</p>
				<div className="footer-icons">
					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-instagram"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-youtube"></i></a>
				</div>
			</div>
         </div>
    </footer>
  
</div>
</BrowserRouter>
  );
}

export default App;
