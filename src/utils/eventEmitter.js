// 🔥 EventEmitter customizado para React Native
class SimpleEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Erro ao executar listener para ${eventName}:`, error);
        }
      });
    }
  }

  removeListener(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (listener) => listener !== callback
      );
    }
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

// 🎯 Instância única
export const eventEmitter = new SimpleEventEmitter();

// 📋 Eventos principais
export const EVENTS = {
  SERVICE_CREATED: "service:created",
  SERVICE_UPDATED: "service:updated",
  COMMUNITY_CREATED: "community:created",
  COMMUNITY_JOINED: "community:joined",
  ORDER_CREATED: "order:created",
  ORDER_STATUS_UPDATED: "order:status_updated",
  ORDER_UPDATED: "order:updated",
  BADGE_UPDATE: "badge:update",
};

// 🔥 Helpers para emitir eventos
export const emitServiceCreated = (service) => {
  console.log("🎉 Emitindo evento: SERVICE_CREATED", service?.id);
  eventEmitter.emit(EVENTS.SERVICE_CREATED, service);
};

export const emitServiceUpdated = (service) => {
  console.log("✏️ Emitindo evento: SERVICE_UPDATED", service?.id);
  eventEmitter.emit(EVENTS.SERVICE_UPDATED, service);
};

export const emitCommunityCreated = (community) => {
  console.log("🏘️ Emitindo evento: COMMUNITY_CREATED", community?.id);
  eventEmitter.emit(EVENTS.COMMUNITY_CREATED, community);
};

export const emitCommunityJoined = (community, user) => {
  console.log("🎉 Emitindo evento: COMMUNITY_JOINED", {
    communityId: community?.id,
    userId: user?.id,
  });
  eventEmitter.emit(EVENTS.COMMUNITY_JOINED, { community, user });
};

export const emitOrderStatusUpdated = (order) => {
  console.log(
    "📦 Emitindo evento: ORDER_STATUS_UPDATED",
    order?.id,
    order?.status
  );
  eventEmitter.emit(EVENTS.ORDER_STATUS_UPDATED, order);

  // ✨ NOVO: Também emitir evento de badge
  emitBadgeUpdate("order", order.clientId, "client");
  emitBadgeUpdate("order", order.providerId, "provider");
};

// ✅ NOVO: Evento específico para badges
export const emitBadgeUpdate = (type, userId, userRole) => {
  eventEmitter.emit(EVENTS.BADGE_UPDATE, { type, userId, userRole });
};

// ✨ NOVO: Helper para emitir criação de pedido
export const emitOrderCreated = (order) => {
  console.log("🎉 Emitindo evento: ORDER_CREATED", order?.id);
  eventEmitter.emit(EVENTS.ORDER_CREATED, order);
};
