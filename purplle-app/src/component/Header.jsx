import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "../styles/Header.css";
import { CartContext } from "../features/ContextProvider";

function Header() {
  const { cart } = useContext(CartContext)
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header>

      <div className="top-bar">
        <span><i className="fa-solid fa-mobile"></i> DOWNLOAD APP</span>
        <span><i className="fa-solid fa-circle-info"></i> SUPPORT</span>
        <span><i className="fa-solid fa-truck"></i> TRACK ORDER</span>
      </div>

      <div className="main-header">
        <div className="search">
          <input type="text" placeholder="What are you looking for?" />
          <i className="fa fa-search"></i>
        </div>

        <div className="logo">
          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1728010486_purplle-logo.svg" />
          <img
            className="elite"
            src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1728644752_join-elite-150.gif"
          />
        </div>

        <div className="icons">

          <div className="icon">
            <Link to="/Wishlist">
              <i className="fa-regular fa-heart"></i>
            </Link>
          </div>

          <div className="icon">
            <Link
              to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>

            <span>{cart.length}</span>
          </div>


          /*<div className="icon">
            <Link to="/login">
              <i className="fa-regular fa-face-smile">Login</i>
            </Link>
          </div>*/

          <div className="icon">
            {user ? (
              <Link to="/profile">
                <i className="fa-regular fa-user"></i>
              </Link>
            ) : (
              <Link to="/login">
                <i className="fa-regular fa-face-smile">Login</i>
              </Link>
            )}
          </div>



        </div>
      </div>

      <div className="category-bar">
        <span ><i className="fa-regular fa-square-caret-down" />SHOP CATEGORIES</span>
        <span>BRANDS</span>
        <span>OFFERS</span>
        <span>NEW</span>
        <span>SPLURGE</span>
        <span>MAGAZINE</span>
        <span>ELITE OFFERS</span>
      </div>

    </header>
  );
}

export default Header;
