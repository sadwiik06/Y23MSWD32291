const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware"); // Import middlewares

const router = express.Router();

router.post("/", protect, authorize("admin"), createProduct); // Only admin can create products
router.get("/", getProducts); // Public route, anyone can view products
router.put("/:id", protect, authorize("admin"), updateProduct); // Only admin can update
router.delete("/:id", protect, authorize("admin"), deleteProduct); // Only admin can delete
const QRCode = require('qrcode');
const Product = require('../models/Product'); // Make sure the model is imported

// GET QR Code for a specific product
router.get('/:id/qrcode', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const qrData = JSON.stringify({
      name: product.name,
      price: product.price,
      category: product.category,
    });

    const qrCode = await QRCode.toDataURL(qrData);
    res.json({ qrCode });
  } catch (err) {
    console.error('QR Code generation error:', err.message);
    res.status(500).json({ message: 'Error generating QR Code' });
  }
});

module.exports = router;
