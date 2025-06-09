export const generateWelcomeMessage = (providerName) => {
  return {
    type: "system",
    content: `Olá! Você iniciou uma conversa com ${providerName}. 
Em breve você receberá um orçamento para o serviço solicitado.
    
Algumas dicas:
• Mantenha a comunicação clara e objetiva
• Tire todas as suas dúvidas sobre o serviço
• Aguarde o orçamento para prosseguir com o agendamento
    
Bom atendimento! 😊`,
  };
};

export default generateWelcomeMessage;
