// src/controllers/classeController.js
import prisma from "../config/database.js";

// GET - Toutes les classes
export const getAllClasses = async (req, res, next) => {
  try {
    const { niveau, parcours } = req.query;

    const where = {};
    if (niveau) where.niveau = niveau;
    if (parcours) where.parcours = parcours;

    const classes = await prisma.classe.findMany({
      where,
      orderBy: [{ niveau: "asc" }, { parcours: "asc" }, { groupe: "asc" }],
    });

    res.json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Une classe par ID
export const getClasseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const classe = await prisma.classe.findUnique({
      where: { id },
    });

    if (!classe) {
      return res.status(404).json({
        success: false,
        message: "Classe non trouvée",
      });
    }

    res.json({
      success: true,
      data: classe,
    });
  } catch (error) {
    next(error);
  }
};
