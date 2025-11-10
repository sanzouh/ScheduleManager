// src/hooks/useReferenceData.js
import { useState, useEffect } from "react";
import { referenceApi } from "../api/referenceApi";

export const useReferenceData = () => {
  const [data, setData] = useState({
    professeurs: [],
    classes: [],
    matieres: [],
    salles: [],
    creneaux: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [professeurs, classes, matieres, salles, creneaux] =
          await Promise.all([
            referenceApi.getProfesseurs(),
            referenceApi.getClasses(),
            referenceApi.getMatieres(),
            referenceApi.getSalles(),
            referenceApi.getCreneaux(),
          ]);

        setData({
          professeurs: professeurs.data || [],
          classes: classes.data || [],
          matieres: matieres.data || [],
          salles: salles.data || [],
          creneaux: creneaux.data || [],
        });
      } catch (err) {
        setError("Erreur lors du chargement des données de référence");
        console.error("Erreur référence:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    ...data,
    loading,
    error,
    isReady: !loading && !error,
  };
};
