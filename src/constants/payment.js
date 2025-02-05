export const COMPANY_PAYMENT_INFO = {
  name: "Nome da Empresa LTDA",
  document: "12.345.678/0001-00",
  pix: {
    key: "12345678900",
    type: "CNPJ",
  },
  bankAccount: {
    bank: "Banco do Brasil",
    agency: "1234-5",
    account: "12345-6",
    type: "Conta Corrente",
  },
};

export const PAYMENT_METHODS = {
  pix: {
    id: "pix",
    title: "PIX",
    description: "Pagamento instantâneo",
    icon: "flash-outline",
  },
  bank_transfer: {
    id: "bank_transfer",
    title: "Transferência Bancária",
    description: "TED/DOC",
    icon: "card-outline",
  },
};

export const PIX_INSTRUCTIONS = [
  "1. Copie a chave PIX abaixo",
  "2. Abra seu aplicativo do banco",
  "3. Realize a transferência PIX com o valor exato",
  "4. Após realizar o pagamento, clique em 'Confirmar Pagamento'",
  "5. Aguarde a confirmação (pode levar até 24h úteis)",
];

export const BANK_TRANSFER_INSTRUCTIONS = [
  "1. Anote os dados bancários abaixo",
  "2. Realize a transferência com o valor exato",
  "3. Após realizar a transferência, clique em 'Confirmar Pagamento'",
  "4. Aguarde a confirmação (pode levar até 24h úteis)",
];
