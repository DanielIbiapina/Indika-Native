import api from "./api";

export const communityService = {
  // ✅ MÉTODO MELHORADO: Lista com filtros inteligentes
  list: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 30,
        category,
        userCity,
        userState,
        userId,
        includeFriends = false,
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(userCity && { userCity }),
        ...(userState && { userState }),
        ...(userId && { userId }),
        includeFriends: includeFriends.toString(),
      });

      const response = await api.get(`/communities?${queryParams}`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // ✅ NOVO: Lista inteligente com dados do usuário automaticamente
  listWithUserContext: async (params = {}) => {
    try {
      // Buscar dados do usuário atual para contextualizar
      const userProfile = await api.get("/users/me");
      const { city, state, id } = userProfile.data;

      return await communityService.list({
        ...params,
        userCity: city,
        userState: state,
        userId: id,
        includeFriends: false, // Por padrão, excluir comunidades de amigos dos outros
      });
    } catch (error) {
      // Se não conseguir pegar dados do usuário, buscar sem contexto
      console.warn(
        "Não foi possível obter contexto do usuário, buscando sem filtros de localização"
      );
      return await communityService.list(params);
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
      console.log("🔍 Comunidades do usuário:", response.data);
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
    return error.response.data;
  } else {
    console.error("Erro desconhecido:", error);
    return error;
  }
};
