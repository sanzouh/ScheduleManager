// src/controllers/creneauController.js
import prisma from "../config/database.js";

// GET - Tous les créneaux
export const getAllCreneaux = async (req, res, next) => {
  try {
    const creneaux = await prisma.creneau.findMany({
      orderBy: { ordre: "asc" },
    });

    res.json({
      success: true,
      count: creneaux.length,
      data: creneaux,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Un créneau par ID
export const getCreneauById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const creneau = await prisma.creneau.findUnique({
      where: { id },
    });

    if (!creneau) {
      return res.status(404).json({
        success: false,
        message: "Créneau non trouvé",
      });
    }

    res.json({
      success: true,
      data: creneau,
    });
  } catch (error) {
    next(error);
  }
};
