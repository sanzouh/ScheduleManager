import express from "express";
import {
  getAllMatieres,
  getMatiereById,
} from "../controllers/matiereController.js";

const router = express.Router();

router.get("/", getAllMatieres);
router.get("/:id", getMatiereById);

export default router;
