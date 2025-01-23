import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { BottomNav, NavItem, NavText } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons"; // Biblioteca para ícones

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <BottomNav>
      <NavItem
        active={route.name === "Home"}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon
          name="home"
          size={24}
          color={route.name === "Home" ? "#422680" : "#666666"}
        />
        <NavText active={route.name === "Home"}>Início</NavText>
      </NavItem>

      <NavItem
        active={route.name === "Comunidades"}
        onPress={() => navigation.navigate("Comunidades")}
      >
        <Icon
          name="group"
          size={24}
          color={route.name === "Comunidades" ? "#422680" : "#666666"}
        />
        <NavText active={route.name === "Comunidades"}>Comunidades</NavText>
      </NavItem>

      <NavItem
        active={route.name === "Pedidos"}
        onPress={() => navigation.navigate("Pedidos")}
      >
        <Icon
          name="shopping-bag"
          size={24}
          color={route.name === "Pedidos" ? "#422680" : "#666666"}
        />
        <NavText active={route.name === "Pedidos"}>Pedidos</NavText>
      </NavItem>

      <NavItem
        active={route.name === "Entrar"}
        onPress={() => navigation.navigate("Entrar")}
      >
        <Icon
          name="login"
          size={24}
          color={route.name === "Entrar" ? "#422680" : "#666666"}
        />
        <NavText active={route.name === "Entrar"}>Entrar</NavText>
      </NavItem>
    </BottomNav>
  );
};

export default BottomNavigation;
