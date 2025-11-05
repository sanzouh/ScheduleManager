// src/routes/index.js
import express from "express";

const router = express.Router();

// Route de test
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API ENI Schedule Manager",
    timestamp: new Date().toISOString(),
  });
});

// Les autres routes seront montées ici plus tard
// router.use('/cours', coursRoutes);
// router.use('/professeurs', professeurRoutes);

export default router;
