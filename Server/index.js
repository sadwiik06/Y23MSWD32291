require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const connectDB = require("./config/db");
const QRCode = require('qrcode');
// Route Imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const Feedback = require("./models/feedback");

// Validate essential environment variables
const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI", "GMAIL_USER", "GMAIL_PASSWORD"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ ERROR: ${envVar} is missing in the .env file.`);
    process.exit(1);
  }
});

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
}, authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Feedback Submission Route
app.post("/api/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Save feedback to the database
    const feedbackEntry = new Feedback({ name, email, feedback });
    await feedbackEntry.save();

    // Send acknowledgment email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Thank you for your feedback, ${name}!`,
      text: `Hi ${name},\n\nWe have received your feedback: "${feedback}".\nWe will get back to you soon!\n\nBest Regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Feedback submitted successfully, and email sent!" });
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});
app.get('/product/:id/qrcode', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    const data = JSON.stringify({
      name: product.name,
      price: product.price,
      category: product.category,
    });

    const qrCode = await QRCode.toDataURL(data);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
