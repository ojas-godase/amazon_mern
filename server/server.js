const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./Model");

const app = express();
const port = 9000;

// middlewares
app.use(express.json());
const url =
  "mongodb+srv://ojas01010:ImOjas01010@cluster0.inw4fyr.mongodb.net/?retryWrites=true&w=majority";

// Database

mongoose.connect(url).mongoose.connection.once("connected", () => {
  console.log("connected to db");
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// login the user
app.post("/login", async (req, res) => {
  let newUser = req.body;
  const user = await User.find({ email: newUser.user.email });
  if (user.length == 0) {
    res.send(false);
  } else {
    if (
      newUser.user.name !== user[0].name ||
      newUser.user.password !== user[0].password
    ) {
      res.send({ status: "Wrong Credentials", user: null });
    } else {
      res.send({ status: "Correct", user: user[0] });
    }
  }
});

// create the new user
app.post("/create", async (req, res) => {
  const check = await User.findOne({ email: req.body.newUser.email }).exec();

  if (!check) {
    const newUser = new User(req.body.newUser);
    const insertedUser = await newUser.save();
    res.send(false);
    return;
  } else {
    res.send(true);
    return;
  }
});
// update the cart when addToCart or removeFromCart is called
app.post("/update", async (req, res) => {
  const newCart = req.body.newCart;
  const user_id = req.body.user._id;
  const update = await User.findByIdAndUpdate(
    { _id: user_id },
    { cartProduct: newCart }
  );
});

// Listeners
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
