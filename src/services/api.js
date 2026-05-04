import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = process.env.REACT_APP_API_URL;


const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const testService = {
  getAllTests: async () => {
    try {
      const response = await api.get('/test/api/list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTestById: async (id) => {
    try {
      const response = await api.get(`/test/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTest: async (testData) => {
    try {
      const response = await api.post('/test/save', testData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTest: async (id, testData) => {
    try {
      const response = await api.put(`/test/update/${id}`, testData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTest: async (id) => {
    try {
      const response = await api.delete(`/test/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchTests: async (keyword) => {
    try {
      const response = await api.get(`/test/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const rechercherParNumeroDemande = (numeroDemande) =>
  axios.get(`${BASE_URL}/demandesRecherche`, {
    params: { numeroDemande }
  });

// Recherche par numéro de passeport
export const rechercherParPasseport = (numeroPasseport) =>
  axios.get(`${BASE_URL}/demandesRecherche`, {
    params: { numeroPasseport }
  });

// Détails d'une demande
export const getDemandeDetails = (id) =>
  axios.get(`${BASE_URL}/demandeDetails/${id}`);

// Historique des statuts
export const getHistoStatut = (id) =>
  axios.get(`${BASE_URL}/demandeDetails/HistoStatut/${id}`);

// Fichiers uploadés
export const getDetailsFichier = (id) =>
  axios.get(`${BASE_URL}/demandeDetails/DetailsFichier/${id}`);

// Recherche duplicata/transfert
export const rechercherDuplicata = (numCarte, numVisa, transfer, duplicata) =>
  axios.post(`${BASE_URL}/duplicata/rechercher`, null, {
    params: { numCarte, numVisa, transfer, duplicata }
  });

export default api;