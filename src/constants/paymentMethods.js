export const PAYMENT_METHODS = {
  pix: {
    id: "pix",
    title: "PIX",
    description: "Receba pagamentos instantaneamente",
    icon: "key-outline",
    enabled: true,
  },
  bank_account: {
    id: "bank_account",
    title: "Conta Bancária",
    description: "Transferência bancária tradicional",
    icon: "card-outline",
    enabled: true,
  },
  stripe: {
    id: "stripe",
    title: "Stripe Connect",
    description: "Receba pagamentos nacionais e internacionais",
    icon: "globe-outline",
    enabled: true,
  },
};
