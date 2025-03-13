import styled from "styled-components/native";

export const TooltipContainer = styled.View`
  position: absolute;
  top: 70px;
  right: 16px;
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  max-width: 250px;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-right: 8px;
`;

export const TooltipText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  flex: 1;
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
  top: -8px;
  right: -8px;
  background-color: #fff;
  border-radius: 12px;
  padding: 2px;
  elevation: 4;
`;
