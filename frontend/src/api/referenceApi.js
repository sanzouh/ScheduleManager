// src/api/referenceApi.js
import axios from "./axiosConfig";

export const referenceApi = {
  // Professeurs
  getProfesseurs: async () => {
    const response = await axios.get("/professeurs");
    return response.data;
  },

  // Classes
  getClasses: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`/classes?${params.toString()}`);
    return response.data;
  },

  // Matières
  getMatieres: async () => {
    const response = await axios.get("/matieres");
    return response.data;
  },

  // Salles
  getSalles: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`/salles?${params.toString()}`);
    return response.data;
  },

  // Créneaux
  getCreneaux: async () => {
    const response = await axios.get("/creneaux");
    return response.data;
  },
};
