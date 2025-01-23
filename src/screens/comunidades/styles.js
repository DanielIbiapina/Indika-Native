import styled from "styled-components/native";

export const Container = styled.View`
  padding: 16px;
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  padding: 16px;

  elevation: 2;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-vertical: 16px;
`;

export const Section = styled.View`
  margin-vertical: 16px;
  //padding-horizontal: 16px;
`;

export const SectionTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const AddButtonContainer = styled.View`
  //padding-horizontal: 16px;
`;

export const AddButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #fff;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0 32px;
`;

export const LoginPrompt = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #dc3545;
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
