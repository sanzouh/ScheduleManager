// src/routes/professeurRoutes.js
import express from "express";
import {
  getAllProfesseurs,
  getProfesseurById,
} from "../controllers/professeurController.js";

const router = express.Router();

router.get("/", getAllProfesseurs);
router.get("/:id", getProfesseurById);

export default router;
