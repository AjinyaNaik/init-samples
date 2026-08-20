import nodemailer from "nodemailer";
import { generateOrderReceiptHtml } from "../utils/email-templates/reciept";

if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  console.warn("GMAIL environment variables are missing.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

interface ReceiptItem {
  name: string;
  price: number;
}

interface SendOrderReceiptOptions {
  to: string;
  username: string;
  orderId: string;
  items: ReceiptItem[];
  totalAmount: number;
}

export const sendOrderReceiptEmail = async ({
  to,
  username,
  orderId,
  items,
  totalAmount,
}: SendOrderReceiptOptions) => {
  try {
    const html = generateOrderReceiptHtml({
      username,
      orderId,
      items,
      totalAmount,
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
    });

    const info = await transporter.sendMail({
      from: `"init samples" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Init Samples Order Confirmation! (#${orderId.slice(-6)})`,
      html,
    });

    console.log("Order confirmation email sent successfully: %s", info.messageId);
    return true;
  }
  catch (error) {
    console.error("Failed to send order confirmation email via Gmail:", error);
    throw new Error("Email delivery failed");
  }
};