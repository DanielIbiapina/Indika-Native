import styled from "styled-components/native";

export const BadgeContainer = styled.View`
  position: absolute;
  top: ${({ size }) => (size === "large" ? "-8px" : "-6px")};
  right: ${({ size }) => (size === "large" ? "-8px" : "-6px")};
  background-color: #ff3b30;
  border-radius: ${({ size }) => (size === "large" ? "12px" : "10px")};
  min-width: ${({ size }) => (size === "large" ? "24px" : "20px")};
  height: ${({ size }) => (size === "large" ? "24px" : "20px")};
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: ${({ size }) => (size === "large" ? "12px" : "10px")};
  font-weight: 600;
  text-align: center;
`;
