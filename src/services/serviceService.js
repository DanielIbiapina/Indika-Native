import api from "./api";

export const serviceService = {
  // Listar serviços com filtros e paginação
  list: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        minPrice,
        maxPrice,
        orderBy = "createdAt",
        profileId,
      } = params;

      const queryParams = {
        page: String(page),
        limit: String(limit),
      };

      if (typeof orderBy === "string") {
        queryParams.orderBy = JSON.stringify({ [orderBy]: "desc" });
      }

      if (category) queryParams.category = category;
      if (minPrice) queryParams.minPrice = String(minPrice);
      if (maxPrice) queryParams.maxPrice = String(maxPrice);
      if (profileId) queryParams.profileId = profileId;

      const queryString = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join("&");

      const response = await api.get(`/services?${queryString}`);

      return response.data;
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error);
      throw handleError(error, "Erro ao listar serviços");
    }
  },

  // Buscar serviços por texto
  search: async (query) => {
    try {
      const response = await api.get(
        `/services/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao buscar serviços");
    }
  },

  // Criar um novo serviço
  create: async (formData) => {
    try {
      const response = await api.post("/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao criar serviço");
    }
  },

  // Obter serviço por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao obter serviço");
    }
  },

  // Listar serviços do usuário autenticado
  getMyServices: async (params = {}) => {
    try {
      const { page = 1, limit = 10 } = params;

      const queryParams = {
        page: String(page),
        limit: String(limit),
      };

      const queryString = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join("&");

      const response = await api.get(`/services/me?${queryString}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao listar seus serviços");
    }
  },

  // Deletar um serviço
  delete: async (id) => {
    try {
      await api.delete(`/services/${id}`);
    } catch (error) {
      throw handleError(error, "Erro ao deletar serviço");
    }
  },
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};
