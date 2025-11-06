// src/routes/coursRoutes.js
import express from "express";
import {
  getAllCours,
  getCoursById,
  getWeekSchedule,
  createCours,
  updateCours,
  deleteCours,
  validateCours,
} from "../controllers/coursController.js";

const router = express.Router();

// GET routes
router.get("/", getAllCours);
router.get("/semaine", getWeekSchedule);
router.get("/:id", getCoursById);

// POST routes
router.post("/", createCours);
router.post("/valider", validateCours);

// PUT routes
router.put("/:id", updateCours);

// DELETE routes
router.delete("/:id", deleteCours);

export default router;
