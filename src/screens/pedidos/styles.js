import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: column;
  margin-vertical: 16px;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};

  border-radius: 8px;
`;

export const TabText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#fff" : "#666")};
`;

export const LoginPrompt = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
`;

export const IllustrationWrapper = styled.View`
  background-color: #f0f7ff;
  padding: 24px;
  border-radius: 50px;
  margin-bottom: 8px;
`;

export const PromptText = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 14px 32px;
  border-radius: 8px;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #dc3545;
  margin-top: 20px;
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 2;
`;

export const FilterButtonText = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 4px;
`;
