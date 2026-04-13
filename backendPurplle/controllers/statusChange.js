const OrderModel = require("../models/order");
const sendMail = require("./sendEmail");

exports.statusChange = async (req, res) => {
      try {
        const { status } = req.body;
        const { id } = req.params;
    
        const order = await OrderModel.findById(id);
        console.log("USER:", order?.user);
    
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        order.status = status;
        await order.save();
    
        const items = order.products
          ?.map(p => `${p.name} (x ${p.quantity})`)
          .join(", ");
    
        const message = `
          <h2>Your Purplle App Order Status Updated</h2>
          <p>Hello ${order.user?.fullName}, </p>
          <p>Your Order_ID: ${order._id}</p>
          <p>Your order is now <b>${status}</b>.</p>
          <p><b>Your Order Items:</b> ${items}</p>
          <p>Total: ₹${order.totalPrice}</p>
          <p>Payment_method: ${order.user?.payment}</p>
        `;
    
        if (order.user?.email) {
          console.log(" Sending email to:", order.user.email);
          await sendMail(order.user.email, " Purplle App", message);
        }
    
        res.json({ success: true });
    
      } catch (err) {
        console.log(" ERROR:", err);
        res.status(500).json({ error: err.message });
      }
};