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

      //  HEADER 
      doc
        .fillColor("#6a1b9a")
        .fontSize(22)
        .text("PURPLLE APP", { align: "center" });

      doc.moveDown(0.3);

      doc
        .fillColor("#000")
        .fontSize(18)
        .text("ORDER INVOICE", { align: "center" });

      doc.moveDown();

      // CUSTOMER BOX
      doc.rect(50, doc.y, 500, 90).stroke();
      doc.moveDown(0.5);

      doc.fontSize(12).text(`Order ID: ${orderId}`);
      doc.text(`Customer Name: ${orderData.user.fullName}`);
      doc.text(`Email: ${orderData.user.email}`);
      doc.text(`Phone: ${orderData.user.number}`);
      doc.text(`Address: ${orderData.user.address}`);
      doc.text(`Payment Method: ${orderData.user.payment}`);
      doc.moveDown();

      // PRODUCTS TITLE 
      doc
        .fillColor("#6a1b9a")
        .fontSize(14)
        .text("Products", { underline: true });

      doc.moveDown(0.5);

      // PRODUCTS LOOP 
      orderData.products.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);

        doc
          .fillColor("#000")
          .fontSize(12)
          .text(`${index + 1}. ${item.name}`, { continued: true })
          .text(`   Rs.${item.price} x ${item.quantity}`, { align: "right" });

        doc.text(`Total: Rs.${itemTotal}`, { align: "right" });
        doc.moveDown(0.5);
      });

      //  PRICE BOX
      doc.moveDown();
      doc.rect(300, doc.y, 250, 90).stroke();
      doc.moveDown(0.5);

      doc.text(`Total Items: ${orderData.totalItems}`);
      doc.text(`Subtotal: Rs.${orderData.subtotal}`);
      doc.text(`GST (${orderData.gstRate}%): Rs.${orderData.gstAmount}`);
      doc.text(`Total Price: Rs.${orderData.totalPrice}`);

      doc.moveDown();

      //  FOOTER 
      doc
        .fillColor("#6a1b9a")
        .fontSize(12)
        .text("Thank you for shopping with Purplle!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;