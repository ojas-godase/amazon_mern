import React, { useEffect, useState } from "react";
import "./Checkout.css";
import CartProduct from "./CartProduct";

export default function Checkout(props) {
  const [cartProduct, setCartProduct] = useState(props.products);
  const [totalPrice, setTotalPrice] = useState(0);
  function getPrice() {
    let price = 0;
    cartProduct.map((product) => (price = price + parseInt(product.price)));
    setTotalPrice(price);
  }
  useEffect(() => {
    getPrice();
  }, [cartProduct]);

  function removeFromCart(product) {
    const newProducts = cartProduct.filter(
      (pro) => pro.title !== product.title
    );
    setCartProduct(newProducts);
    props.removeFromCart(product);
  }
  return (
    <div className="check">
      <div className="checkout">
        <h1 className="shp-cart">Shopping Cart</h1>
        <hr className="line" />
        <div className="cart-products">
          {cartProduct.map((product) => {
            return (
              <CartProduct product={product} removeFromCart={removeFromCart} />
            );
          })}
        </div>
      </div>
      <div className="total">
        <div className="totalprice">
          <div className="subtotal">
            Subtotal ({cartProduct.length} items) :{" "}
          </div>

          <div className="cost">
            <small className="small">$</small> {totalPrice}{" "}
          </div>
        </div>
        <div className="gift">
          <input type="checkbox" />
          <div>This order contains a gift</div>
        </div>
        <div className="cart-checkout">
          <button className="addtocart check-btn">Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}
