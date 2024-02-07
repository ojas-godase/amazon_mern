import React, { useState } from "react";
import "./Product.css";

function Product(props) {
  const [cart, setCart] = useState(props.product.cart);
  function addToCart() {
    setCart((prev) => !prev);
    props.addToCart(props.product);
  }
  function removeFromCart() {
    setCart((prev) => !prev);
    props.removeFromCart(props.product);
  }
  return (
    <div className="product-container">
      <div className="title">{props.product.title}</div>
      <div className="price">
        <small>$</small>
        <p className="prc">{props.product.price}</p>
      </div>
      <div className="rating">
        {/* <img className="star" src="./images/star.png" alt="" /> */}
      </div>
      <div className="img">
        <img src={props.product.img} alt="" className="product-img" />
      </div>
      {cart === false ? (
        <button className="addtocart" onClick={addToCart}>
          Add to Cart
        </button>
      ) : (
        <button className="removefromcart" onClick={removeFromCart}>
          Remove from Cart
        </button>
      )}
    </div>
  );
}

export default Product;
