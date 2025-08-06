import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { orderService } from "../services/orderService";
import { serviceService } from "../services/serviceService";
import { eventEmitter, EVENTS } from "../utils/eventEmitter";
import { useAuth } from "./authContext";

const BadgeContext = createContext();

export const useBadge = () => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadge deve ser usado dentro de BadgeProvider");
  }
  return context;
};

export const BadgeProvider = ({ children }) => {
  console.log("🚀 BadgeProvider iniciado");

  const { user } = useAuth();
  const [badges, setBadges] = useState({
    pedidos: 0,
    solicitacoes: 0,
    mensagens: 0,
  });
  const [userServices, setUserServices] = useState([]);
  const [isProvider, setIsProvider] = useState(false);

  const checkIfUserIsProvider = async () => {
    if (!user?.id) return false;

    try {
      console.log("🔍 Verificando se user é provider...");
      const services = await serviceService.getMyServices({ limit: 1 });
      const hasServices = services && services.length > 0;

      console.log(
        `👤 User ${user.id} tem ${
          services?.length || 0
        } serviços (isProvider: ${hasServices})`
      );
      setUserServices(services || []);
      setIsProvider(hasServices);
      return hasServices;
    } catch (error) {
      console.error("❌ Erro ao verificar serviços:", error);
      setIsProvider(false);
      return false;
    }
  };

  useEffect(() => {
    if (user?.id) {
      // console.log("👤 User mudou:", user.id);
      checkIfUserIsProvider();
    }
  }, [user?.id]);

  const loadBadges = async () => {
    console.log("📥 Carregando badges do AsyncStorage...");
    try {
      const savedBadges = await AsyncStorage.getItem("app_badges");
      if (savedBadges) {
        const parsedBadges = JSON.parse(savedBadges);
        console.log("✅ Badges carregados:", parsedBadges);
        setBadges(parsedBadges);
      } else {
        console.log("📭 Nenhum badge salvo encontrado");
      }
    } catch (error) {
      console.error("❌ Erro ao carregar badges:", error);
    }
  };

  const saveBadges = async (newBadges) => {
    console.log("💾 Salvando badges:", newBadges);
    try {
      await AsyncStorage.setItem("app_badges", JSON.stringify(newBadges));
      setBadges(newBadges);
      console.log("✅ Badges salvos com sucesso");
    } catch (error) {
      console.error("❌ Erro ao salvar badges:", error);
    }
  };

  const incrementBadge = (type) => {
    console.log(`🔴 INCREMENTANDO badge: ${type} (atual: ${badges[type]})`);
    const newBadges = {
      ...badges,
      [type]: badges[type] + 1,
    };
    console.log(`🔴 Novo valor: ${type} = ${newBadges[type]}`);
    saveBadges(newBadges);
  };

  const decrementBadge = (type) => {
    console.log(`🔻 DECREMENTANDO badge: ${type} (atual: ${badges[type]})`);
    const newBadges = {
      ...badges,
      [type]: Math.max(0, badges[type] - 1),
    };
    saveBadges(newBadges);
  };

  const clearBadge = (type) => {
    console.log(`🧹 LIMPANDO badge: ${type} (atual: ${badges[type]})`);
    const newBadges = {
      ...badges,
      [type]: 0,
    };
    saveBadges(newBadges);
  };

  const testIncrement = (type) => {
    console.log(`🧪 TESTE MANUAL: Incrementando ${type}`);
    incrementBadge(type);
  };

  const refreshBadgesFromServer = async () => {
    if (!user?.id) return;

    console.log(
      `🔄 Atualizando badges para user ${user.id} (isProvider: ${isProvider})`
    );

    try {
      let pedidosCount = 0;
      let solicitacoesCount = 0;

      try {
        console.log("👤 Buscando pedidos como cliente...");
        const clientOrdersResponse = await orderService.list({
          role: "client",
        });

        // ✅ CORREÇÃO: Extrair orders do response
        const clientOrders =
          clientOrdersResponse.orders || clientOrdersResponse;

        console.log(
          `👤 Pedidos como cliente encontrados: ${clientOrders?.length || 0}`
        );

        pedidosCount =
          clientOrders?.filter((order) => {
            return (
              order.status === "QUOTE_SENT" || order.status === "QUOTE_ACCEPTED"
            );
          }).length || 0;

        console.log(`👤 Cliente: ${pedidosCount} pedidos com update`);
      } catch (error) {
        console.error("❌ Erro ao buscar pedidos como cliente:", error);
      }

      if (isProvider) {
        try {
          console.log("🔧 Buscando solicitações como prestador...");
          const providerOrdersResponse = await orderService.list({
            role: "provider",
          });

          // ✅ CORREÇÃO: Extrair orders do response
          const providerOrders =
            providerOrdersResponse.orders || providerOrdersResponse;

          console.log(
            `🔧 Solicitações como prestador encontradas: ${
              providerOrders?.length || 0
            }`
          );

          solicitacoesCount =
            providerOrders?.filter((order) => {
              return (
                order.status === "WAITING_QUOTE" ||
                order.status === "QUOTE_REJECTED"
              );
            }).length || 0;

          console.log(
            `🔧 Prestador: ${solicitacoesCount} solicitações pendentes`
          );
        } catch (error) {
          console.error(
            "❌ Erro ao buscar solicitações como prestador:",
            error
          );
        }
      }

      const newBadges = {
        ...badges,
        pedidos: pedidosCount,
        solicitacoes: solicitacoesCount,
      };

      console.log(`📊 Novos badges calculados:`, newBadges);
      saveBadges(newBadges);
    } catch (error) {
      console.error("❌ Erro ao atualizar badges do servidor:", error);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    console.log("🎧 Configurando event listeners para badges");

    const handleOrderStatusUpdate = (orderData) => {
      console.log("📦 EVENT: Order status updated", {
        orderId: orderData?.id,
        status: orderData?.status,
        clientId: orderData?.clientId,
        providerId: orderData?.providerId,
        currentUserId: user?.id,
      });

      if (orderData.clientId === user?.id) {
        console.log(
          "👤 É um pedido do cliente atual - incrementando badge pedidos"
        );
        incrementBadge("pedidos");
      }

      if (orderData.providerId === user?.id) {
        console.log(
          "🔧 É uma solicitação para o prestador atual - incrementando badge solicitações"
        );
        incrementBadge("solicitacoes");
      }
    };

    eventEmitter.on(EVENTS.ORDER_STATUS_UPDATED, handleOrderStatusUpdate);
    console.log("✅ Event listeners registrados");

    return () => {
      console.log("🧹 Removendo event listeners");
      eventEmitter.removeListener(
        EVENTS.ORDER_STATUS_UPDATED,
        handleOrderStatusUpdate
      );
    };
  }, [user?.id]);

  useEffect(() => {
    console.log("🏁 Carregando badges na inicialização");
    loadBadges();
  }, []);

  useEffect(() => {
    if (user?.id && isProvider !== undefined) {
      console.log("🔄 IsProvider mudou, atualizando badges...");
      refreshBadgesFromServer();
    }
  }, [isProvider, user?.id]);

  const value = {
    badges,
    isProvider,
    incrementBadge,
    decrementBadge,
    clearBadge,
    refreshBadgesFromServer,
    testIncrement,
  };

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
};
