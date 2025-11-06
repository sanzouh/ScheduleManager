// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/logger.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();

// ==================== MIDDLEWARES GLOBAUX ====================
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ==================== ROUTES ====================
app.use("/api", routes);

// Route racine
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API ENI Schedule Manager",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      docs: "/api/docs (à venir)",
    },
  });
});

// ==================== GESTION DES ERREURS ====================
app.use(errorHandler);

// Route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
    path: req.path,
  });
});

export default app;
