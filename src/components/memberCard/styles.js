import styled from "styled-components/native";

export const Card = styled.View`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 12px;
  flex-direction: row;
  gap: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 3; /* Para sombras no Android */
`;

export const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: bold;
`;

export const Profession = styled.Text`
  font-size: 13px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Stats = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
`;

export const Connections = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
