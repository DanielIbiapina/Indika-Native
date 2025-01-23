import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background-color: white;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
  margin: 4px 8px;
  width: 80px;
  height: 100px;
  justify-content: center;
`;

export const Icon = styled.View`
  font-size: 24px;
  margin-bottom: 4px;
`;

export const Title = styled.Text`
  font-size: 11px;
  text-align: center;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
