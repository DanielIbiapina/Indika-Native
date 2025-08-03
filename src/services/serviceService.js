import api from "./api";

export const serviceService = {
  // Listar serviços com filtros e paginação
  list: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        orderBy = "createdAt",
        profileId,
        // 🔥 NOVOS PARÂMETROS:
        userLocation, // { latitude, longitude, city, state }
        maxDistance = 50, // km
        filterByLocation = true,
      } = params;

      const queryParams = {
        page: String(page),
        limit: String(limit),
      };

      if (typeof orderBy === "string") {
        queryParams.orderBy = JSON.stringify({ [orderBy]: "desc" });
      }

      if (category) queryParams.category = category;
      if (profileId) queryParams.profileId = profileId;

      // 🔥 FILTROS DE LOCALIZAÇÃO:
      if (filterByLocation && userLocation) {
        if (userLocation.latitude && userLocation.longitude) {
          queryParams.lat = userLocation.latitude;
          queryParams.lng = userLocation.longitude;
          queryParams.maxDistance = maxDistance;
        } else if (userLocation.city) {
          queryParams.city = userLocation.city;
          queryParams.state = userLocation.state;
        }
      }

      const queryString = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join("&");

      console.log("🔍 Query String:", queryString);
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

  // ✅ NOVA: Função separada para busca por proximidade (ADICIONAL)
  searchNearby: async (location, radius = 25) => {
    try {
      const response = await api.get("/services/nearby", {
        params: {
          lat: location.latitude,
          lng: location.longitude,
          radius,
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao buscar serviços próximos");
    }
  },

  // ✅ MODIFICAR: create para incluir serviceArea
  create: async (formData, serviceId = null) => {
    try {
      // Se tem serviceId, adicionar ao FormData
      if (serviceId) {
        formData.append("serviceId", serviceId);
      }

      const response = await api.post("/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao salvar serviço");
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
