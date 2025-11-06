import express from "express";
import {
  getAllCreneaux,
  getCreneauById,
} from "../controllers/creneauController.js";

const router = express.Router();

router.get("/", getAllCreneaux);
router.get("/:id", getCreneauById);

export default router;
