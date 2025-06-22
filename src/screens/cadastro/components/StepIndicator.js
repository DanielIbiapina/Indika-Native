import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  margin-top: 16px;
`;

const StepBar = styled.View`
  flex: 1;
  height: 4px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : "#E0E0E0"};
  margin: 0 4px;
  border-radius: 2px;
`;

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <IndicatorContainer>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <StepBar key={index} active={index <= currentStep} />
      ))}
    </IndicatorContainer>
  );
};

export default StepIndicator;
