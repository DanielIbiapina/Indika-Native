import React, { useState, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/authContext";
import { linking } from "./linking";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBadge } from "../contexts/badgeContext";
import Badge from "../components/badge";

// Importar as telas
import Home from "../screens/home";
import Comunidades from "../screens/comunidades";
import Pedidos from "../screens/pedidos";
import Profile from "../screens/perfil";
import Login from "../screens/login";
import ComunidadeDetalhes from "../screens/comunidadeDetalhes";
import ServicoDetalhes from "../screens/servicoDetalhes";
import ServicesByCategory from "../screens/services";
import CriarComunidade from "../screens/comunidades/criar";
import CriarServico from "../screens/services/criar";

// Importar as novas telas de pagamento
import HistoricoPagamento from "../screens/pagamentos/historicoPagamento";
import Saques from "../screens/pagamentos/saques";
import SetupMetodoPagamento from "../screens/pagamentos/setupMetodoPagamento";

// Importar a nova tela
import ProcessarPagamento from "../screens/pagamentos/processarPagamento";

import Configuracoes from "../screens/configuracoes";
import DadosPessoais from "../screens/configuracoes/dadosPessoais";
import Seguranca from "../screens/configuracoes/seguranca";
import Notificacoes from "../screens/configuracoes/notificacoes";
import Idioma from "../screens/configuracoes/idioma";
//import VisibilidadePerfil from "../screens/configuracoes/visibilidadePerfil";
import Localizacao from "../screens/configuracoes/localizacao";
import CentralAjuda from "../screens/configuracoes/centralDeAjuda";
import TermosUso from "../screens/configuracoes/termosDeUso";
import Mensagens from "../screens/mensagens";
import Pagamentos from "../screens/pagamentos";
import AllReviews from "../screens/todasAvaliacoes"; // Importar a nova tela
import PerfilVisitante from "../screens/perfilVisitante"; // Adicionar este import
import PedidoDetalhes from "../screens/pedidoDetalhes";

// Importar a nova tela de confirmação de pagamento
import ConfirmarPagamento from "../screens/pagamentos/confirmarPagamento";
import Assinaturas from "../screens/assinaturas";
import ProcessarPagamentoAssinatura from "../screens/pagamentos/processarPagamentoAssinatura";

// Importar as novas telas de autenticação e cadastro
import OnBoarding from "../screens/onBoarding";
import SignupFlow from "../screens/cadastro"; // <--- NOVO: Fluxo de cadastro unificado
import TodasComunidades from "../screens/todasComunidades";

// Importar as telas de esqueceu senha
import ForgotPasswordPhone from "../screens/forgotPassword/phoneStep";
import ForgotPasswordCode from "../screens/forgotPassword/codeStep";

import { notificationService } from "../services/notificationService";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator(); // Nova stack para autenticação

// Navegador de autenticação
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Entrar" component={Login} />
      <AuthStack.Screen name="Cadastro" component={SignupFlow} />
      <AuthStack.Screen
        name="EsqueceuSenhaPhone"
        component={ForgotPasswordPhone}
        options={{
          headerShown: true,
          title: "Esqueceu a Senha",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <AuthStack.Screen
        name="EsqueceuSenhaCode"
        component={ForgotPasswordCode}
        options={{
          headerShown: true,
          title: "Redefinir Senha",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

// Navegador principal com Stack
const MainStack = () => {
  const { signed } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

  // Verificar se o usuário já viu o onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenOnboarding");
        setHasSeenOnboarding(value === "true");
      } catch (error) {
        console.error("Erro ao verificar onboarding:", error);
        setHasSeenOnboarding(false);
      }
    };

    checkOnboarding();
  }, []);

  // Mostrar tela de carregamento enquanto verifica
  if (hasSeenOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#422680" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding && (
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      )}

      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="TermosUso"
        component={TermosUso}
        options={{
          headerShown: true,
          title: "Termos de Uso e Política de Privacidade",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="ComunidadeDetalhes"
        component={ComunidadeDetalhes}
        options={{
          headerShown: true,
          title: "Detalhes da Comunidade",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen name="ServicoDetalhes" component={ServicoDetalhes} />
      <Stack.Screen
        name="ServicosPorCategoria"
        component={ServicesByCategory}
      />
      <Stack.Screen
        name="CriarComunidade"
        component={CriarComunidade}
        options={{
          headerShown: true,
          title: "Criar Comunidade",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen name="CriarServico" component={CriarServico} />

      {!signed ? (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen
            name="ProcessarPagamento"
            component={ProcessarPagamento}
            options={{
              headerShown: true,
              title: "Realizar Pagamento",
            }}
          />

          <Stack.Screen
            name="Configuracoes"
            component={Configuracoes}
            options={{
              headerShown: true,
              title: "Configurações",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="HistoricoPagamento"
            component={HistoricoPagamento}
            options={{
              headerShown: true,
              title: "Histórico de Pagamentos",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen name="Saques" component={Saques} />
          <Stack.Screen
            name="ConfigurarPagamento"
            component={SetupMetodoPagamento}
            options={{
              headerShown: true,
              title: "Configurar Recebimentos",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />

          <Stack.Screen
            name="DadosPessoais"
            component={DadosPessoais}
            options={{
              headerShown: true,
              title: "Dados Pessoais",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Seguranca"
            component={Seguranca}
            options={{
              headerShown: true,
              title: "Segurança",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Notificacoes"
            component={Notificacoes}
            options={{
              headerShown: true,
              title: "Notificações",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Idioma"
            component={Idioma}
            options={{
              headerShown: true,
              title: "Idioma",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          {/*<Stack.Screen
            name="VisibilidadePerfil"
            component={VisibilidadePerfil}
            options={{
              headerShown: true,
              title: "Visibilidade do Perfil",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />*/}
          <Stack.Screen
            name="Localizacao"
            component={Localizacao}
            options={{
              headerShown: true,
              title: "Localização",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="CentralAjuda"
            component={CentralAjuda}
            options={{
              headerShown: true,
              title: "Central de Ajuda",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Mensagens"
            component={Mensagens}
            options={{
              headerShown: true,
              title: "Mensagens",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Pagamentos"
            component={Pagamentos}
            options={{
              headerShown: true,
              title: "Pagamentos",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen name="TodasAvaliacoes" component={AllReviews} />
          <Stack.Screen
            name="PerfilVisitante"
            component={PerfilVisitante}
            options={{
              headerShown: true,
              title: "Perfil",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="PedidoDetalhes"
            component={PedidoDetalhes}
            options={{
              headerShown: true,
              title: "Detalhes do Pedido",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="ConfirmarPagamento"
            component={ConfirmarPagamento}
            options={{
              headerShown: true,
              title: "Confirmar Pagamento",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="Assinaturas"
            component={Assinaturas}
            options={{
              headerShown: true,
              title: "Assinaturas",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="ProcessarPagamentoAssinatura"
            component={ProcessarPagamentoAssinatura}
            options={{
              headerShown: true,
              title: "Assinaturas",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="TodasComunidades"
            component={TodasComunidades}
            options={{
              headerShown: true,
              title: "Comunidades",
              headerTintColor: "#422680",
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// Navegador de Tabs (bottom menu)
const TabNavigator = () => {
  const { signed, user } = useAuth();
  const { badges, isProvider } = useBadge();

  // Debug dos badges
  console.log("📱 TabNavigator render:");
  console.log("   👤 User:", user?.id);
  console.log("   🔧 IsProvider:", isProvider);
  console.log("   📊 Badges:", badges);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let badgeCount = 0;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Comunidades") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "cart" : "cart-outline";
            badgeCount = badges.pedidos;
            console.log(`📋 Tab Pedidos - Badge count: ${badgeCount}`);
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
            badgeCount = isProvider ? badges.solicitacoes : 0;
            console.log(
              `👤 Tab Perfil - Badge count: ${badgeCount} (isProvider: ${isProvider})`
            );
          } else if (route.name === "Entrar") {
            iconName = focused ? "log-in" : "log-in-outline";
          }

          return (
            <View style={{ position: "relative" }}>
              <Ionicons name={iconName} size={size} color={color} />
              {badgeCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -8,
                    zIndex: 1,
                  }}
                >
                  <Badge count={badgeCount} size="small" />
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "#422680",
        tabBarInactiveTintColor: "#666666",
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          height: 55,
          paddingTop: 5,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Comunidades" component={Comunidades} />
      <Tab.Screen name="Pedidos" component={Pedidos} />
      {signed ? (
        <Tab.Screen name="Perfil" component={Profile} />
      ) : (
        <Tab.Screen name="Entrar" component={Login} />
      )}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const navigationRef = useRef();

  useEffect(() => {
    // ✅ CONFIGURAR: Referência de navegação
    notificationService.setNavigationRef(navigationRef.current);

    // ✅ CONFIGURAR: Listeners
    notificationService.setupNotificationListeners();

    // ✅ REGISTRAR: Callbacks opcionais
    notificationService.registerCallback("newOrderReceived", (data) => {
      // Atualizar badge de pedidos
      console.log("Novo pedido recebido:", data);
    });

    return () => {
      notificationService.removeNotificationListeners();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
