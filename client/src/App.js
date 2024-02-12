import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Carousel from "./Carousel.js";
import Navbar from "./Navbar.js";
import Product from "./Product.js";
import Login from "./Login.js";
import Checkout from "./Checkout.js";

function App() {
  // all the products
  const [product, setProduct] = useState([
    {
      id: 1,
      title: "Valentines Day Gift",
      price: "19.99",
      img: "https://m.media-amazon.com/images/I/71H3miSK4BL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      cart: false,
    },
    {
      id: 2,
      title: "Anniversary Candle Gifts ",
      price: "9.74",
      img: " https://m.media-amazon.com/images/I/61CQmCWkIUL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
      cart: false,
    },
    {
      id: 3,
      title: "Chinese New Year Decorations",
      price: "13.99",
      img: "https://m.media-amazon.com/images/I/81Ha+gJbQLL._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 4,
      title: "Intel Core i9 13900K 3.0 GHz, NVIDIA RTX 4090 PC",
      price: "3699",
      img: "https://m.media-amazon.com/images/I/61tt1B-wR5L._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 5,
      title: "Asus rog motherboard",
      price: "169",
      img: "https://m.media-amazon.com/images/I/813WBwlPh+L._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 6,
      title: "24-Piece Black Silverware Set with Steak Knives",
      price: "19.99",
      img: "https://m.media-amazon.com/images/I/71vZ7TGZW1L._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 7,
      title: "Knife Set",
      price: "42.99",
      img: "https://m.media-amazon.com/images/I/51RysU9gRsL._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 8,
      title: "Cup Set",
      price: "64",
      img: "https://m.media-amazon.com/images/I/71kLAuuMxQL._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 9,
      title: "Gel Pens",
      price: "8.79",
      img: "https://m.media-amazon.com/images/I/61-Tt667sbL._AC_SX679_.jpg",
      cart: false,
    },
    {
      id: 10,
      title: "Wireless HeadSet",
      price: "58.99",
      img: "https://m.media-amazon.com/images/I/51xv9fOvToL._AC_SX466_.jpg",
      cart: false,
    },
    {
      id: 11,
      title: "Logitech Mechanical keyboard",
      price: "8.79",
      img: "https://m.media-amazon.com/images/I/61++ok6AqtL._AC_SY300_SX300_.jpg",
      cart: false,
    },
    {
      id: 12,
      title: "Adidas Ultraboost",
      price: "165.00",
      img: "https://m.media-amazon.com/images/I/71BIVsoHt-L._AC_SX575_.jpg",
      cart: false,
    },
  ]);
  // cart products
  const [cartProduct, setCartProduct] = useState([]);
  async function addToCart(prod) {
    const newCart = [prod, ...cartProduct];
    setCartProduct(newCart);
    setCartSize((prev) => prev + 1);
    prod.cart = true;
    if (isLoggedIn) {
      const update = await axios
        .post("https://amazon-clone-hf4n.onrender.com/update", {
          newCart,
          user,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(
          function (error) {
            console.log(error);
          },
          (err, status) => {
            if (err) {
              console.log(err);
            } else {
              console.log(status);
            }
          }
        );
    }
  }

  // size of the cart
  const [cartSize, setCartSize] = useState(0);

  // remove from cart
  async function removeFromCart(prod) {
    const newCart = cartProduct.filter((pro) => pro.id !== prod.id);
    setCartProduct(newCart);
    setCartSize((prev) => prev - 1);
    prod.cart = false;
    if (isLoggedIn) {
      await axios
        .post("https://amazon-clone-hf4n.onrender.com/update", {
          newCart,
          user,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  // User info
  const [name, setName] = useState("Guest");
  const [user, setUser] = useState({
    name: "Guest",
  });
  // redirect to home page
  const navigate = useNavigate();
  function LogIn() {
    navigate("/");
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getUser(user) {
    const check = await axios
      .post("https://amazon-clone-hf4n.onrender.com/login", {
        user,
      })
      .then(function (response) {
        if (response.data === false) {
          alert(
            "You don't have an Amazon Account . Please Create an Amazon Account"
          );
        } else {
          if (response.data.status === "Wrong Credentials") {
            alert("Password or name are invalid");
          } else if (response.data.status === "Correct") {
            const currUser = response.data.user;
            const cart = [...cartProduct, ...currUser.cartProduct];
            currUser.cartProduct = cart;
            setUser(currUser);
            setCartProduct(currUser.cartProduct);
            setCartSize(currUser.cartProduct.length);

            currUser.cartProduct.map((cartpro) => {
              product.map((pro) => {
                if (cartpro.id === pro.id) {
                  pro.cart = cartpro.cart;
                }
              });
            });
            setProduct(product);
            setName(currUser.name);
            setIsLoggedIn(true);
            LogIn();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // get user info
  function checkUser(user) {
    getUser({ ...user, cartProduct });
  }
  // create a new user
  async function createUser(user) {
    let newUser = { ...user, cartProduct };
    const make = await axios
      .post("https://amazon-clone-hf4n.onrender.com/create", {
        newUser,
      })
      .then(function (response) {
        if (response.data == true) {
          alert("You already have an Amazon Account. Click Sign-in");
        } else {
          const cart = [cartProduct, ...newUser.cartProduct];
          setUser((prev) => ({ ...prev, cartProduct: cart }));
          setName(user.name);
          setIsLoggedIn(true);
          LogIn();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar cartSize={cartSize} name={name} isLoggedIn={isLoggedIn} />
              <div className="home">
                <div className="carousel-container">
                  <Carousel />
                </div>

                <div className="products">
                  {product.map((product) => {
                    return (
                      <Product
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Navbar cartSize={cartSize} name={name} isLoggedIn={isLoggedIn} />
              <Login checkUser={checkUser} createUser={createUser} />
            </>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <>
              <Navbar cartSize={cartSize} name={name} isLoggedIn={isLoggedIn} />
              <Checkout
                products={cartProduct}
                removeFromCart={removeFromCart}
              />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
