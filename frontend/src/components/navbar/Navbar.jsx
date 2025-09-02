import React, { useContext, useState } from 'react'
import './navbar.css'
import logo from '../assets/Frontend_Assets/logo.png'
import cart_icon from '../assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from "../../context/Shopcontext";

export default function Navbar(){
  const [menu,setMenu]=useState("shop")    
  const { cartquantity } = useContext(ShopContext);  

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          {" "}
          <Link to="/">Shop</Link> {menu == "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("men")}>
          {" "}
          <Link to="/mens">Men</Link> {menu == "men" && <hr />}
        </li>
        <li onClick={() => setMenu("women")}>
          {" "}
          <Link to="/womens">Women</Link> {menu == "women" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          {" "}
          <Link to="/kids">Kids</Link> {menu == "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to={"/cart"}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{cartquantity()}</div>
      </div>
    </div>
  );
}

