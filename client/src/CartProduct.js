import React from "react";
import "./CartProduct.css";

export default function CartProduct(props) {
  return (
    <div className="cart-product">
      <div className="img">
        <img src={props.product.img} alt="" className="image" />
      </div>
      <div className="info">
        <div className="cart-title">{props.product.title}</div>
        <div className="cart-price">
          <small>$</small> {props.product.price}
        </div>
        <button
          className="remove"
          onClick={() => props.removeFromCart(props.product)}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}
