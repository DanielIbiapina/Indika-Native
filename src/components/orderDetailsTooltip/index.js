import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  TooltipContainer,
  TooltipText,
  TooltipArrow,
  CloseButton,
  IconContainer,
} from "./styles";

const OrderDetailsTooltip = ({ onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <TooltipContainer as={Animated.View} style={{ opacity: fadeAnim }}>
      <IconContainer>
        <Ionicons name="information-circle" size={24} color="#422680" />
      </IconContainer>
      <TooltipText>
        Você pode acessar os detalhes completos do seu pedido a qualquer momento
      </TooltipText>
      <TooltipArrow />
      <CloseButton onPress={handleClose}>
        <Ionicons name="close" size={20} color="#666" />
      </CloseButton>
    </TooltipContainer>
  );
};

export default OrderDetailsTooltip;
