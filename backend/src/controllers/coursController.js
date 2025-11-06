// src/controllers/coursController.js
import prisma from "../config/database.js";
import { checkConflicts } from "../services/coursService.js";

// GET - Tous les cours avec filtres
export const getAllCours = async (req, res, next) => {
  try {
    const { classe, professeur, salle, jour, semestre } = req.query;

    const where = {};
    if (classe) where.classeId = classe;
    if (professeur) where.professeurId = professeur;
    if (salle) where.salleId = salle;
    if (jour) where.jour = jour;
    if (semestre) where.semestre = semestre;

    const cours = await prisma.cours.findMany({
      where,
      include: {
        matiere: true,
        professeur: true,
        classe: true,
        salle: true,
        creneau: true,
      },
      orderBy: [{ jour: "asc" }, { creneau: { ordre: "asc" } }],
    });

    res.json({
      success: true,
      count: cours.length,
      data: cours,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Emploi du temps de la semaine
export const getWeekSchedule = async (req, res, next) => {
  try {
    const { classeId, professeurId, salleId, semestre } = req.query;

    const where = {};
    if (classeId) where.classeId = classeId;
    if (professeurId) where.professeurId = professeurId;
    if (salleId) where.salleId = salleId;
    if (semestre) where.semestre = semestre;

    const cours = await prisma.cours.findMany({
      where,
      include: {
        matiere: true,
        professeur: true,
        classe: true,
        salle: true,
        creneau: true,
      },
      orderBy: [{ jour: "asc" }, { creneau: { ordre: "asc" } }],
    });

    res.json({
      success: true,
      count: cours.length,
      data: cours,
    });
  } catch (error) {
    next(error);
  }
};

// GET - Un cours par ID
export const getCoursById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cours = await prisma.cours.findUnique({
      where: { id },
      include: {
        matiere: true,
        professeur: true,
        classe: true,
        salle: true,
        creneau: true,
      },
    });

    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    res.json({
      success: true,
      data: cours,
    });
  } catch (error) {
    next(error);
  }
};

// POST - Créer un cours
export const createCours = async (req, res, next) => {
  try {
    const coursData = req.body;

    // Vérifier les conflits
    const validation = await checkConflicts(coursData);
    if (!validation.valide) {
      return res.status(400).json({
        success: false,
        message: "Conflits détectés",
        conflits: validation.conflits,
      });
    }

    // Créer le cours
    const cours = await prisma.cours.create({
      data: coursData,
      include: {
        matiere: true,
        professeur: true,
        classe: true,
        salle: true,
        creneau: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Cours créé avec succès",
      data: cours,
    });
  } catch (error) {
    next(error);
  }
};

// PUT - Modifier un cours
export const updateCours = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coursData = req.body;

    // Vérifier que le cours existe
    const existingCours = await prisma.cours.findUnique({
      where: { id },
    });

    if (!existingCours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    // Vérifier les conflits (en excluant le cours actuel)
    const validation = await checkConflicts(coursData, id);
    if (!validation.valide) {
      return res.status(400).json({
        success: false,
        message: "Conflits détectés",
        conflits: validation.conflits,
      });
    }

    // Mettre à jour le cours
    const cours = await prisma.cours.update({
      where: { id },
      data: coursData,
      include: {
        matiere: true,
        professeur: true,
        classe: true,
        salle: true,
        creneau: true,
      },
    });

    res.json({
      success: true,
      message: "Cours modifié avec succès",
      data: cours,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Supprimer un cours
export const deleteCours = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cours = await prisma.cours.findUnique({ where: { id } });
    if (!cours) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    await prisma.cours.delete({ where: { id } });

    res.json({
      success: true,
      message: "Cours supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// POST - Valider un cours (vérifier conflits sans créer)
export const validateCours = async (req, res, next) => {
  try {
    const coursData = req.body;
    const validation = await checkConflicts(coursData);

    res.json({
      success: true,
      data: validation,
    });
  } catch (error) {
    next(error);
  }
};
