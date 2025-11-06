// src/controllers/professeurController.js
import prisma from "../config/database.js";

// GET - Tous les professeurs
export const getAllProfesseurs = async (req, res, next) => {
  try {
    const professeurs = await prisma.professeur.findMany({
      orderBy: [{ nom: "asc" }, { prenom: "asc" }],
    });

    res.json({
      success: true,
      count: professeurs.length,
      data: professeurs,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Un professeur par ID
export const getProfesseurById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const professeur = await prisma.professeur.findUnique({
      where: { id },
    });

    if (!professeur) {
      return res.status(404).json({
        success: false,
        message: "Professeur non trouvé",
      });
    }

    res.json({
      success: true,
      data: professeur,
    });
  } catch (error) {
    next(error);
  }
};
