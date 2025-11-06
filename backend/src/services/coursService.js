// src/services/coursService.js
import prisma from "../config/database.js";

/**
 * Vérifie les conflits avant de créer/modifier un cours
 * Retourne { valide: boolean, conflits: array }
 */
export const checkConflicts = async (coursData, excludeId = null) => {
  const { professeurId, classeId, salleId, jour, creneauId, semestre } =
    coursData;

  const where = {
    jour,
    creneauId,
    semestre: semestre || "S1",
    NOT: excludeId ? { id: excludeId } : undefined, // Pour exclure le cours courant
  };

  const conflits = [];

  // 1. Vérifier si le professeur est déjà occupé
  const profOccupe = await prisma.cours.findFirst({
    where: { ...where, professeurId },
    include: {
      professeur: true,
      classe: true,
      creneau: true,
    },
  });

  if (profOccupe) {
    conflits.push({
      type: "professeur",
      message: `${profOccupe.professeur.prenom} ${profOccupe.professeur.nom} est déjà occupé avec ${profOccupe.classe.nom} à ce créneau`,
      cours: profOccupe,
    });
  }

  // 2. Vérifier si la classe est déjà occupée
  const classeOccupee = await prisma.cours.findFirst({
    where: { ...where, classeId },
    include: {
      matiere: true,
      professeur: true,
      creneau: true,
    },
  });

  if (classeOccupee) {
    conflits.push({
      type: "classe",
      message: `La classe a déjà cours de ${classeOccupee.matiere.nom} à ce créneau`,
      cours: classeOccupee,
    });
  }

  // 3. Vérifier si la salle est déjà occupée
  const salleOccupee = await prisma.cours.findFirst({
    where: { ...where, salleId },
    include: {
      salle: true,
      classe: true,
      creneau: true,
    },
  });

  if (salleOccupee) {
    conflits.push({
      type: "salle",
      message: `La salle ${salleOccupee.salle.numero} est déjà réservée par ${salleOccupee.classe.nom}`,
      cours: salleOccupee,
    });
  }

  return {
    valide: conflits.length === 0,
    conflits,
  };
};
