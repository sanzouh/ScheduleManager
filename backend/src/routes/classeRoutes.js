import express from "express";
import {
  getAllClasses,
  getClasseById,
} from "../controllers/classeController.js";

const router = express.Router();

router.get("/", getAllClasses);
router.get("/:id", getClasseById);

export default router;
