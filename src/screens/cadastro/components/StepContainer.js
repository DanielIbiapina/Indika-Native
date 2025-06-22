import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const OuterContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 100%;
`;

const StepCard = styled.View`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const Header = styled.View`
  position: relative;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 4px;
  padding: 4px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 8px;
`;

const StepContainer = ({ title, subtitle, onBack, children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OuterContainer>
        <StepCard>
          <Header>
            {onBack && (
              <BackButton onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </BackButton>
            )}
            <Title>{title}</Title>
          </Header>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {children}
        </StepCard>
      </OuterContainer>
    </TouchableWithoutFeedback>
  );
};

export default StepContainer;
