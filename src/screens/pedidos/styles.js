import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  margin-vertical: 16px;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 0px;
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
  color: ${({ theme }) => theme.colors.text.primary};
  margin-vertical: 16px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 24px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  border-radius: 12px;
`;

export const TabText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? "white" : theme.colors.text.secondary};
`;

export const LoginPrompt = styled.View`
  align-items: center;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  margin-top: 24px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const IllustrationWrapper = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  padding: 24px;
  border-radius: 50px;
  margin-bottom: 16px;
`;

export const PromptText = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 32px;
  border-radius: 24px;
  elevation: 2;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  font-size: 16px;
  margin-top: 24px;
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 12px 16px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const FilterButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 500;
`;

export const ViewAllText = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;

export const SectionTitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 8px;
`;
