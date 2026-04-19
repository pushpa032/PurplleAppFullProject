const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      /*file: String*/
      imageUrl: String,
    }
  ],
  user: {
    fullName: String,
    number: String,
    email: String,
    address: String,
    payment: String
  },

  //for GST
  subtotal: {
    type: Number,
    default: 0
  },
  gstRate: {
    type: Number,
    default: 5
  },

  gstAmount: {
    type: Number,
    default: 0
  },

//final total 
  totalItems: Number,
  totalPrice: Number,


  status: { type: String, default: "Pending" },

  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);