// Criar um arquivo de constantes para organizar melhor
export const CATEGORIES = {
  // Casa e Construção
  "Reformas e Reparos": {
    icon: "home-repair-service",
    color: "#4CAF50",
    subcategories: [
      "Pedreiro",
      "Pintor",
      "Marceneiro",
      "Eletricista",
      "Encanador",
    ],
  },

  "Jardinagem e Paisagismo": {
    icon: "nature",
    color: "#4CAF50",
    subcategories: ["Jardineiro", "Paisagista", "Poda de Árvores"],
  },

  // Serviços Técnicos
  "Assistência Técnica": {
    icon: "build",
    color: "#2196F3",
    subcategories: [
      "Eletrônicos",
      "Eletrodomésticos",
      "Informática",
      "Ar Condicionado e Refrigeração",
    ],
  },

  // Serviços Domésticos
  "Serviços Domésticos": {
    icon: "home",
    color: "#9C27B0",
    subcategories: ["Limpeza", "Cozinheiro", "Babá", "Cuidador"],
  },
  "Pets e Veterinária": {
    icon: "pets",
    color: "#FF8A65",
    subcategories: ["Veterinário", "Pet Shop", "Adestramento"],
  },

  // Educação
  Aulas: {
    icon: "school",
    color: "#3F51B5",
    subcategories: ["Particulares", "Idiomas", "Música", "Esportes"],
  },

  // Eventos
  Eventos: {
    icon: "event",
    color: "#E91E63",
    subcategories: ["Festas", "Casamentos", "Corporativo", "Infantil"],
  },
  "Fotografia e Filmagem": {
    icon: "camera-alt",
    color: "#795548",
    subcategories: ["Fotografia", "Filmagem", "Edição"],
  },

  // Serviços Pessoais
  "Beleza e Estética": {
    icon: "face",
    color: "#E91E63",
    subcategories: ["Cabeleireiro", "Manicure", "Esteticista"],
  },
  "Saúde e Bem-estar": {
    icon: "health-and-safety",
    color: "#4CAF50",
    subcategories: ["Massagem", "Fisioterapia", "Personal Trainer"],
  },

  // Transporte
  Transporte: {
    icon: "local-shipping",
    color: "#FF9800",
    subcategories: ["Mudanças e Fretes", "Transporte de Passageiros"],
  },

  // Profissionais
  "Consultoria Empresarial": {
    icon: "business",
    color: "#607D8B",
    subcategories: ["Consultoria", "Contabilidade", "Jurídico"],
  },

  // Tecnologia
  "Tecnologia e Digital": {
    icon: "computer",
    color: "#2196F3",
    subcategories: ["Desenvolvimento", "Design", "Suporte"],
  },

  // ✅ NOVAS CATEGORIAS
  "Alimentação e Culinária": {
    icon: "restaurant",
    color: "#FF6B35",
    subcategories: [
      "Doces e Salgados",
      "Marmitex",
      "Bufê",
      "Cozinheira Particular",
      "Confeitaria",
    ],
  },

  Segurança: {
    icon: "security",
    color: "#1A237E",
    subcategories: ["Vigilância", "Porteiro", "Instalação de Alarmes"],
  },

  Automóveis: {
    icon: "directions-car",
    color: "#424242",
    subcategories: ["Mecânico", "Lavagem", "Funilaria", "Elétrica Automotiva"],
  },

  "Costura e Artesanato": {
    icon: "content-cut",
    color: "#8E24AA",
    subcategories: ["Costureira", "Bordado", "Artesanato", "Personalização"],
  },

  "Marketing e Publicidade": {
    icon: "campaign",
    color: "#FF5722",
    subcategories: [
      "Social Media",
      "Design Gráfico",
      "Publicidade",
      "Branding",
    ],
  },

  "Arquitetura e Engenharia": {
    icon: "architecture",
    color: "#455A64",
    subcategories: ["Arquiteto", "Engenheiro", "Projeto", "Consultoria"],
  },

  "Turismo e Hospedagem": {
    icon: "travel-explore",
    color: "#00796B",
    subcategories: ["Guia Turístico", "Hospedagem", "Transfer", "Passeios"],
  },

  "Limpeza Especializada": {
    icon: "cleaning-services",
    color: "#4FC3F7",
    subcategories: ["Pós-Obra", "Hospitalar", "Industrial", "Carpet"],
  },
};

export const CATEGORY_ICONS = Object.keys(CATEGORIES).reduce(
  (acc, category) => {
    acc[category] = CATEGORIES[category].icon;
    return acc;
  },
  {}
);

// Adicionar imagens padrão
export const DEFAULT_CATEGORY_IMAGES = {
  "Reformas e Reparos":
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Jardinagem e Paisagismo":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Assistência Técnica":
    "https://images.unsplash.com/photo-1523655223303-4e9ef5234587?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Serviços Domésticos":
    "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Pets e Veterinária":
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  Aulas:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  Eventos:
    "https://images.unsplash.com/photo-1671036089231-a56464fdaadd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Fotografia e Filmagem":
    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Beleza e Estética":
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Saúde e Bem-estar":
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  Transporte:
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Consultoria Empresarial":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "Tecnologia e Digital":
    "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbGlzZSUyMGVzdGF0aXN0aWNhfGVufDB8fDB8fHww",
  "Alimentação e Culinária":
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format&fit=crop&q=60",
  Segurança:
    "https://images.unsplash.com/photo-1609902726285-00668009f829?w=700&auto=format&fit=crop&q=60",
  Automóveis:
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=700&auto=format&fit=crop&q=60",
  "Costura e Artesanato":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=60",
  "Marketing e Publicidade":
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=700&auto=format&fit=crop&q=60",
  "Arquitetura e Engenharia":
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&auto=format&fit=crop&q=60",
  "Turismo e Hospedagem":
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&auto=format&fit=crop&q=60",
  "Limpeza Especializada":
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=700&auto=format&fit=crop&q=60",
};

// Função helper para obter categoria
export const getCategoryInfo = (categoryName) => {
  return CATEGORIES[categoryName] || null;
};

// Função para obter todas as categorias de uma seção
export const getCategoriesBySection = () => {
  return {
    "Casa e Construção": [
      "Reformas e Reparos",
      "Jardinagem e Paisagismo",
      "Limpeza Especializada",
    ],
    "Serviços Técnicos": ["Assistência Técnica"],
    "Serviços Domésticos": [
      "Serviços Domésticos",
      "Alimentação e Culinária",
      "Pets e Veterinária",
    ],
    Educação: ["Aulas"],
    Eventos: ["Eventos", "Fotografia e Filmagem"],
    "Serviços Pessoais": [
      "Beleza e Estética",
      "Saúde e Bem-estar",
      "Costura e Artesanato",
    ],
    Transporte: ["Transporte", "Automóveis"],
    Profissionais: [
      "Consultoria Empresarial",
      "Arquitetura e Engenharia",
      "Marketing e Publicidade",
    ],
    Tecnologia: ["Tecnologia e Digital"],
    Segurança: ["Segurança"],
    Turismo: ["Turismo e Hospedagem"],
  };
};
