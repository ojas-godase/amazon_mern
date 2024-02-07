import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar(props) {
  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="nav-container">
      <Link to="/">
        <img className="logo" src="./images/amazon_logo.png" alt="" />
      </Link>
      <div className="location">
        <LocationOnIcon className="location-img" />
        <div className="text">
          <div className="text1">Deliver to</div>
          <div className="text2">India</div>
        </div>
      </div>
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search Amazon"
          value={search}
          onChange={handleChange}
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="options">
        <Link to="/login">
          <div className="option">
            {!props.isLoggedIn ? (
              <>
                <div className="text1">Hello {props.name}</div>
                <div className="text2">Sign in</div>
              </>
            ) : (
              <div className="text2">Hello {props.name}</div>
            )}
          </div>
        </Link>
        <div className="option">
          <div className="text1">Returns</div>
          <div className="text2">& Orders</div>
        </div>
        <div className="option">
          <div className="text1">Your </div>
          <div className="text2">Prime</div>
        </div>
        <Link to="/checkout">
          <div className="option-cart">
            <div className="text2">
              <ShoppingCartIcon className="cart" />
            </div>
            <div className="text3">{props.cartSize}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
