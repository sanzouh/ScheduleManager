// src/api/coursApi.js
import axios from "./axiosConfig";

export const coursApi = {
  // GET - Tous les cours avec filtres
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.classe) params.append("classe", filters.classe);
    if (filters.professeur) params.append("professeur", filters.professeur);
    if (filters.salle) params.append("salle", filters.salle);
    if (filters.jour) params.append("jour", filters.jour);
    if (filters.semestre) params.append("semestre", filters.semestre);

    const response = await axios.get(`/cours?${params.toString()}`);
    return response.data;
  },

  // GET - Emploi du temps de la semaine
  getWeekSchedule: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`/cours/semaine?${params.toString()}`);
    return response.data;
  },

  // GET - Un cours par ID
  getById: async (id) => {
    const response = await axios.get(`/cours/${id}`);
    return response.data;
  },

  // POST - Créer un cours
  create: async (coursData) => {
    const response = await axios.post("/cours", coursData);
    return response.data;
  },

  // PUT - Modifier un cours
  update: async (id, coursData) => {
    const response = await axios.put(`/cours/${id}`, coursData);
    return response.data;
  },

  // DELETE - Supprimer un cours
  delete: async (id) => {
    const response = await axios.delete(`/cours/${id}`);
    return response.data;
  },

  // POST - Valider (vérifier conflits)
  validate: async (coursData) => {
    const response = await axios.post("/cours/valider", coursData);
    return response.data;
  },
};
