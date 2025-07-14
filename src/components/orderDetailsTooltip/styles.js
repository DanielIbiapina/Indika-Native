import styled from "styled-components/native";

export const TooltipContainer = styled.View`
  position: absolute;
  top: 60px;
  right: 16px;
  left: 16px;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  elevation: 20;
  z-index: 1000;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  max-width: none;
  flex-direction: row;
  align-items: center;
  border: 2px solid #422680;
`;

export const IconContainer = styled.View`
  margin-right: 8px;
`;

export const TooltipText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
  flex: 1;
  font-weight: 500;
  line-height: 20px;
`;

export const TooltipArrow = styled.View`
  position: absolute;
  top: -8px;
  right: 20px;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-left-width: 8px;
  border-right-width: 8px;
  border-bottom-width: 8px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #fff;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #422680;
  border-radius: 15px;
  padding: 4px;
  elevation: 6;
  border: 2px solid #fff;
`;
