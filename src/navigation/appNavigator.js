import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/authContext";
import { linking } from "./linking";

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
import VisibilidadePerfil from "../screens/configuracoes/visibilidadePerfil";
import Localizacao from "../screens/configuracoes/localizacao";
import CentralAjuda from "../screens/configuracoes/centralDeAjuda";
import TermosUso from "../screens/configuracoes/termosDeUso";
import PoliticaPrivacidade from "../screens/configuracoes/politicaDePrivacidade";
import Mensagens from "../screens/mensagens";
import Pagamentos from "../screens/pagamentos";
import AllReviews from "../screens/todasAvaliacoes"; // Importar a nova tela
import PerfilVisitante from "../screens/perfilVisitante"; // Adicionar este import
import PedidoDetalhes from "../screens/pedidoDetalhes";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegador principal com Stack
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ComunidadeDetalhes" component={ComunidadeDetalhes} />
      <Stack.Screen name="ServicoDetalhes" component={ServicoDetalhes} />
      <Stack.Screen
        name="ServicosPorCategoria"
        component={ServicesByCategory}
      />
      <Stack.Screen name="CriarComunidade" component={CriarComunidade} />
      <Stack.Screen name="CriarServico" component={CriarServico} />

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
      <Stack.Screen
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
      />
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
        name="TermosUso"
        component={TermosUso}
        options={{
          headerShown: true,
          title: "Termos de Uso",
          headerTintColor: "#422680",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="PoliticaPrivacidade"
        component={PoliticaPrivacidade}
        options={{
          headerShown: true,
          title: "Política de Privacidade",
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
    </Stack.Navigator>
  );
};

// Navegador de Tabs (bottom menu)
const TabNavigator = () => {
  const { signed } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Comunidades") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Entrar") {
            iconName = focused ? "log-in" : "log-in-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
