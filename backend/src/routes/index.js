// src/routes/index.js
import express from "express";
import professeurRoutes from "./professeurRoutes.js";
import classeRoutes from "./classeRoutes.js";
import matiereRoutes from "./matiereRoutes.js";
import salleRoutes from "./salleRoutes.js";
import creneauRoutes from "./creneauRoutes.js";

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
router.use("/professeurs", professeurRoutes);
router.use("/classes", classeRoutes);
router.use("/matieres", matiereRoutes);
router.use("/salles", salleRoutes);
router.use("/creneaux", creneauRoutes);

export default router;
