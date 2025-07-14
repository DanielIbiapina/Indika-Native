import React, { createContext, useContext, useState, useCallback } from "react";
import { orderService } from "../services/orderService";
import { emitOrderStatusUpdated } from "../utils/eventEmitter";

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [orderUpdates, setOrderUpdates] = useState({});
  const [loading, setLoading] = useState(false);

  const loadOrders = async (params = {}) => {
    try {
      setLoading(true);
      const orders = await orderService.list(params);
      setOrderList(orders);
      return orders;
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const refreshOrder = async (orderId) => {
    try {
      const updatedOrder = await orderService.getOrder(orderId);

      // Atualiza activeOrder se for o mesmo pedido
      if (activeOrder?.id === orderId) {
        setActiveOrder(updatedOrder);
      }

      // Atualiza na lista de pedidos
      setOrderList((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      return updatedOrder;
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      // Validar se a transição é permitida
      const currentOrder = await orderService.getOrder(orderId);
      const allowedTransitions = {
        WAITING_QUOTE: ["QUOTE_SENT", "CANCELLED"],
        QUOTE_SENT: ["QUOTE_ACCEPTED", "QUOTE_REJECTED"],
        QUOTE_ACCEPTED: ["PAYMENT_PENDING", "CANCELLED"],
        PAYMENT_PENDING: ["PAID", "CANCELLED"],
        PAID: ["COMPLETED", "CANCELLED"],
      };

      if (!allowedTransitions[currentOrder.status]?.includes(newStatus)) {
        throw new Error("Transição de status não permitida");
      }

      await orderService.updateStatus(orderId, newStatus);
      const updatedOrder = await refreshOrder(orderId);

      // 🎯 EMITIR EVENTO: Notificar outras telas automaticamente
      emitOrderStatusUpdated(updatedOrder);

      setOrderUpdates((prev) => ({
        ...prev,
        [orderId]: { status: newStatus, timestamp: Date.now() },
      }));
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw error;
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
    orderList,
    setOrderList,
    orderUpdates,
    updateOrderStatus,
    getOrderDetails,
    loadOrders,
    refreshOrder,
    loading,
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
