import api from "./api";

export const communityService = {
  list: async () => {
    try {
      const response = await api.get("/communities");
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  show: async (id) => {
    try {
      const response = await api.get(`/communities/${id}`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  create: async (formData) => {
    try {
      console.log(formData);
      const response = await api.post("/communities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  getUserCommunities: async () => {
    try {
      const response = await api.get("/communities/me");
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/communities/${id}`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  join: async (id) => {
    try {
      const response = await api.post(`/communities/${id}/join`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  leave: async (id) => {
    try {
      const response = await api.post(`/communities/${id}/leave`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  removeMember: async (communityId, userId) => {
    try {
      const response = await api.post(
        `/communities/${communityId}/members/${userId}/remove`
      );
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Função auxiliar para lidar com erros
const handleError = (error) => {
  if (error.response?.data) {
    console.error("Erro na API:", error.response.data);
    return error.response.data; // Retorna a mensagem de erro do backend
  } else {
    console.error("Erro desconhecido:", error);
    return error; // Retorna o erro bruto se não houver resposta
  }
};
