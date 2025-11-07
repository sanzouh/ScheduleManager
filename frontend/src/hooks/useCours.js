// src/hooks/useCours.js
import { useState, useEffect, useCallback } from "react";
import { coursApi } from "../api/coursApi";

export const useCours = (filters = {}) => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les cours
  const fetchCours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coursApi.getWeekSchedule(filters);
      setCours(data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des cours"
      );
      console.error("Erreur fetchCours:", err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.classeId,
    filters.professeurId,
    filters.salleId,
    filters.jour,
    filters.semestre,
  ]);

  // Créer un cours
  const createCours = async (coursData) => {
    try {
      const result = await coursApi.create(coursData);
      if (result.success) {
        setCours((prev) => [...prev, result.data]);
        return { success: true, data: result.data };
      }
      return { success: false, error: "Erreur lors de la création" };
    } catch (err) {
      return {
        success: false,
        error:
          err.response?.data?.message || "Erreur lors de la création du cours",
      };
    }
  };

  // Modifier un cours
  const updateCours = async (id, coursData) => {
    try {
      const result = await coursApi.update(id, coursData);
      if (result.success) {
        setCours((prev) => prev.map((c) => (c.id === id ? result.data : c)));
        return { success: true, data: result.data };
      }
      return { success: false, error: "Erreur lors de la modification" };
    } catch (err) {
      return {
        success: false,
        error:
          err.response?.data?.message ||
          "Erreur lors de la modification du cours",
      };
    }
  };

  // Supprimer un cours
  const deleteCours = async (id) => {
    try {
      const result = await coursApi.delete(id);
      if (result.success) {
        setCours((prev) => prev.filter((c) => c.id !== id));
        return { success: true };
      }
      return { success: false, error: "Erreur lors de la suppression" };
    } catch (err) {
      return {
        success: false,
        error:
          err.response?.data?.message ||
          "Erreur lors de la suppression du cours",
      };
    }
  };

  // Valider un cours (vérifier conflits)
  const validateCours = async (coursData) => {
    try {
      const result = await coursApi.validate(coursData);
      return result.data || { valide: false, conflits: [] };
    } catch (err) {
      console.error("Erreur validation:", err);
      return {
        valide: false,
        conflits: [{ message: "Erreur lors de la validation" }],
      };
    }
  };

  // Charger au montage et quand les filtres changent
  useEffect(() => {
    fetchCours();
  }, [fetchCours]);

  return {
    cours,
    loading,
    error,
    createCours,
    updateCours,
    deleteCours,
    validateCours,
    refreshCours: fetchCours,
  };
};
