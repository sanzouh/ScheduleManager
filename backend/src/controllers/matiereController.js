// src/controllers/matiereController.js
import prisma from "../config/database.js";

// GET - Toutes les matières
export const getAllMatieres = async (req, res, next) => {
  try {
    const matieres = await prisma.matiere.findMany({
      orderBy: { nom: "asc" },
    });

    res.json({
      success: true,
      count: matieres.length,
      data: matieres,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Une matière par ID
export const getMatiereById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const matiere = await prisma.matiere.findUnique({
      where: { id },
    });

    if (!matiere) {
      return res.status(404).json({
        success: false,
        message: "Matière non trouvée",
      });
    }

    res.json({
      success: true,
      data: matiere,
    });
  } catch (error) {
    next(error);
  }
};
