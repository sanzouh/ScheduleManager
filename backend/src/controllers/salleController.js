// src/controllers/salleController.js
import prisma from "../config/database.js";

// GET - Toutes les salles
export const getAllSalles = async (req, res, next) => {
  try {
    const { type } = req.query;

    const where = {};
    if (type) where.type = type;

    const salles = await prisma.salle.findMany({
      where,
      orderBy: { numero: "asc" },
    });

    res.json({
      success: true,
      count: salles.length,
      data: salles,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Une salle par ID
export const getSalleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const salle = await prisma.salle.findUnique({
      where: { id },
    });

    if (!salle) {
      return res.status(404).json({
        success: false,
        message: "Salle non trouvée",
      });
    }

    res.json({
      success: true,
      data: salle,
    });
  } catch (error) {
    next(error);
  }
};
