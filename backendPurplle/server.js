const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const RegisterModel = require("./models/register");
const ProductModel = require("./models/products");
const CartModel = require("./models/cart");
const authController = require("./controllers/authController");
const carouselRoutes = require("./routes/carouselRoutes");
const Razorpay = require("razorpay");
const OrderModel = require("./models/order");
const { placeOrder } = require("./controllers/orderController");
const { statusChange } = require("./controllers/statusChange");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/carousel", carouselRoutes);

//  MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ROUTES 

app.get("/", (req, res) => {
  res.send("Purplle Backend is Running");
});

// AUTH 

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post("/sendOtp", authController.sendOtp);

//  OTP ROUTE
app.post("/verifyOtp", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await UserModel.findOne({ mobile });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === otp) {
      return res.json({ success: true, message: "OTP verified" });
    }

    return res.json({ success: false, message: "Invalid OTP" });

  } catch (error) {
    console.log("OTP ERROR:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
});

// PRODUCTS 

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch products" });
  }
});

// GET single product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch product" });
  }
});

// ADD PRODUCT 
app.post("/upload", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating,
      imageUrl: req.body.imageUrl,
    });

    await newProduct.save();

    res.json({ message: "Product added successfully" });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE product
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, category, description, rating, imageUrl } = req.body;

    await ProductModel.findByIdAndUpdate(req.params.id, {
      name,
      price,
      category,
      description,
      rating,
      imageUrl,
    });

    res.json({ message: "Product updated" });

  } catch (err) {
    res.status(500).json({ error: "Cannot update product" });
  }
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete product" });
  }
});

// USERS

app.get("/users", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch users" });
  }
});

app.post("/registerUser", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    const existingUser = await RegisterModel.findOne({ mobile });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const newUser = new RegisterModel({
      name,
      mobile,
      email,
      password,
    });

    await newUser.save();

    res.json({ success: true, message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CART

app.post("/addCart", async (req, res) => {
  try {
    const { cart } = req.body;

    let existingCart = await CartModel.findOne();

    if (!existingCart) {
      const newCart = new CartModel({ product: cart });
      await newCart.save();
      return res.json(newCart);
    }

    existingCart.product = cart;
    await existingCart.save();

    res.json(existingCart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getCart", async (req, res) => {
  try {
    const cart = await CartModel.findOne();

    if (!cart) {
      return res.json({ product: [] });
    }

    res.json({ product: cart.product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ORDERS 

app.post("/orders/add/payment", placeOrder);

app.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch orders" });
  }
});

app.put("/orders/:id", statusChange);

app.delete("/orders/:id", async (req, res) => {
  await OrderModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

//  SERVER

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});