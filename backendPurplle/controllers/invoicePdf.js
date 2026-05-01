/*const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoicePDF(orderData, orderId) {
  return new Promise((resolve, reject) => {
    try {
      const invoicesDir = path.join(__dirname, "../invoices");

      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const fileName = `invoice_${orderId}_${Date.now()}.pdf`;
      const filePath = path.join(invoicesDir, fileName);

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(20).text("ORDER INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Order ID: ${orderId}`);
      doc.text(`Customer Name: ${orderData.user.fullName}`);
      doc.text(`Email: ${orderData.user.email}`);
      doc.text(`Phone: ${orderData.user.number}`);
      doc.text(`Address: ${orderData.user.address}`);
      doc.text(`Payment Method: ${orderData.user.payment}`);
      doc.moveDown();

      doc.fontSize(14).text("Products");
      doc.moveDown(0.5);

      orderData.products.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        doc.text(
          `${index + 1}. ${item.name} - Rs.${item.price} x ${item.quantity} = Rs.${itemTotal}`
        );
      });

      doc.moveDown();
      doc.text(`Total Items: ${orderData.totalItems}`);
      doc.text(`Subtotal: Rs.${orderData.subtotal}`);
      doc.text(`GST (${orderData.gstRate}%): Rs.${orderData.gstAmount}`);
      doc.text(`Total Price: Rs.${orderData.totalPrice}`);

      doc.moveDown();
      doc.text("Thank you for your order!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;   */

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoicePDF(orderData, orderId) {
  return new Promise((resolve, reject) => {
    try {
      const invoicesDir = path.join(__dirname, "../invoices");

      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const fileName = `invoice_${orderId}_${Date.now()}.pdf`;
      const filePath = path.join(invoicesDir, fileName);

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // HEADER
      doc.fillColor("#6a1b9a").fontSize(24).text("PURPLLE APP", 50, 50);

      doc
        .fontSize(12)
        .fillColor("#000")
        .text(`Invoice No: ${orderId}`, 350, 50, { width: 250 });

      doc.text(`Date: ${new Date().toDateString()}`, 350, 70, { width: 250 });


      doc.moveDown(2);

      // CUSTOMER DETAILS
      doc.fontSize(12).text("Billed To:", 50, 120);

      doc
        .fontSize(11)
        .text(orderData.user.fullName, 50, 140)
        .text(orderData.user.number)
        .text(orderData.user.address)
        .text(orderData.user.email);

      // PAYMENT INFO (right side)
      doc.fontSize(12).text("Payment Info:", 350, 120);

      doc.fontSize(11).text(orderData.user.payment, 350, 140);

      // TABLE HEADER
      doc.moveDown(3);

      const tableTop = 220;

      doc
        .fontSize(12)
        .text("Description", 50, tableTop)
        .text("Price", 250, tableTop)
        .text("Qty", 320, tableTop)
        .text("Amount", 400, tableTop);

      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      // TABLE ROWS
      let y = tableTop + 30;

      orderData.products.forEach((item) => {
        const amount = item.price * item.quantity;

        doc
          .fontSize(11)
          .text(item.name, 50, y)
          .text(`Rs.${item.price}`, 250, y)
          .text(item.quantity, 320, y)
          .text(`Rs.${amount}`, 400, y);

        y += 25;
      });

      // TOTALS
      doc.moveDown();

      const summaryTop = y + 20;

      doc.text(`Subtotal: Rs.${orderData.subtotal}`, 350, summaryTop);
      doc.text(
        `GST (${orderData.gstRate}%): Rs.${orderData.gstAmount}`,
        350,
        summaryTop + 20,
      );
      doc
        .fontSize(13)
        .text(`Total: Rs.${orderData.totalPrice}`, 350, summaryTop + 45);

      // FOOTER
      doc
        .moveDown(4)
        .fillColor("#6a1b9a")
        .fontSize(12)
        .text("Thank you for shopping with Purplle!", 50, 700, {
          align: "center",
        });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;
