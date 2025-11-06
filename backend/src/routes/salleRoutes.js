import express from "express";
import { getAllSalles, getSalleById } from "../controllers/salleController.js";

const router = express.Router();

router.get("/", getAllSalles);
router.get("/:id", getSalleById);

export default router;
