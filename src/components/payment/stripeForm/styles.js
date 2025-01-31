import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InfoContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary + "10"};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const BulletPoint = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Bullet = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: 8px;
`;

export const BulletText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ConnectButton = styled.TouchableOpacity`
  background-color: #635bff;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const DisconnectButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.error + "20"};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const DisconnectText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 16px;
  font-weight: 500;
`;
