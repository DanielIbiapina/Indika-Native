// polyfills.js - VERSÃO ULTRA COMPLETA
console.log("🔧 Carregando polyfills...");

// ✅ FORÇAR: Definir TUDO antes de qualquer módulo carregar
const mockLocation = {
  href: "https://localhost:3000/",
  protocol: "https:",
  hostname: "localhost",
  port: "3000",
  pathname: "/",
  search: "",
  hash: "",
  origin: "https://localhost:3000",
  host: "localhost:3000",
};

const mockElement = {
  appendChild: () => {},
  insertBefore: () => {},
  removeChild: () => {},
  setAttribute: () => {},
  getAttribute: () => null,
  style: {},
  href: mockLocation.href,
};

// ✅ DEFINIR: Todas as variáveis globais IMEDIATAMENTE
global.location = mockLocation;
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  getComputedStyle: () => ({}),
  location: mockLocation,
  navigator: {
    userAgent: "ReactNative",
    platform: "iOS",
  },
  screen: { width: 375, height: 667 },
  innerWidth: 375,
  innerHeight: 667,
  document: null, // Será definido abaixo
};

global.document = {
  createElement: () => mockElement,
  createTextNode: () => ({}),
  getElementsByTagName: () => [],
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  head: mockElement,
  body: mockElement,
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  readyState: "complete",
  location: mockLocation,
};

global.window.document = global.document;
global.navigator = global.window.navigator;

console.log("✅ Polyfills carregados:", {
  document: !!global.document,
  window: !!global.window,
  location: !!global.location,
  href: global.location?.href,
});
