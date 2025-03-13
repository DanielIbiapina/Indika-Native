import React, { createContext, useContext, useState, useCallback } from "react";
import { orderService } from "../services/orderService";

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderUpdates, setOrderUpdates] = useState({});

  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      setOrderUpdates((prev) => ({
        ...prev,
        [orderId]: { status: newStatus, timestamp: Date.now() },
      }));
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  }, []);

  const getOrderDetails = async (orderId) => {
    try {
      const orderData = await orderService.getOrder(orderId);
      setActiveOrder(orderData);
      return orderData;
    } catch (error) {
      console.error("Erro ao buscar detalhes do pedido:", error);
      return null;
    }
  };

  const value = {
    activeOrder,
    setActiveOrder,
    orderUpdates,
    updateOrderStatus,
    getOrderDetails,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder deve ser usado dentro de um OrderProvider");
  }
  return context;
};
