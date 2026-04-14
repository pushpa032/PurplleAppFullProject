const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const RegisterModel = require("./models/register");
const ProductModel = require("./models/products");
const CartModel = require("./models/cart");
const authController = require("./controllers/authController");
const upload = require("./Multer/upload");
const carouselRoutes = require("./routes/carouselRoutes");
const Razorpay = require("razorpay");
const OrderModel = require("./models/order");
const { placeOrder } = require("./controllers/orderController");
const { statusChange } = require("./controllers/statusChange");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/Images", express.static("public/Images"));
app.use("/carousel", carouselRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

mongoose.connection.on("error", (err) => {
  console.log("MONGO ERROR:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

app.get("/", (req, res) => {
  res.send("Purplle Backend is Running");
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post("/sendOtp", authController.sendOtp);

app.post("/verifyOtp", async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await user.findOne({ mobile });

  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  if (user.verifyOtp === otp) {
    return res.json({ success: true, message: "OTP verified" });
  }

  return res.json({ success: false, message: "Invalid OTP" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch products" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch product" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating,
      file: req.file.filename,
    });
    await newProduct.save();
    res.send({ msg: "Product uploaded successfully" });
  } catch (error) {
    res.status(500).send({ error: "Unable to upload image" });
  }
});

app.put("/products/:id", upload.single("file"), async (req, res) => {
  const { name, price, category, description, rating } = req.body;

  let updateData = {
    name,
    price,
    category,
    description,
    rating,
  };

  if (req.file) {
    updateData.file = req.file.filename;
  }

  await ProductModel.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: "Product updated" });
});

app.delete("/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await RegisterModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch user" });
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

app.put("/users/:id", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    const updateData = { name, mobile, email, password };

    await RegisterModel.findByIdAndUpdate(req.params.id, updateData);

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Cannot update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await RegisterModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete user" });
  }
});

app.post("/addCart", async (req, res) => {
  const { cart } = req.body;

  try {
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

app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
});

app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json("error at razorpay loading");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("failed to fetch");
  }
});

app.post("/verify", (req, res) => {
  const crypto = require("crypto");

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.json({ status: "failure" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});