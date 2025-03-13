import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-vertical: 16px;
`;

export const Section = styled.View`
  margin-bottom: 16px;
`;

export const SectionTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitleText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ViewAllText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AddButtonContainer = styled.View`
  margin-bottom: 24px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const AddButtonText = styled(SectionTitleText)`
  margin-left: 12px;
  font-size: 16px;
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

export const LoginButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 32px;
  border-radius: 24px;
  margin-top: 16px;
  elevation: 2;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyMessage = styled.View`
  align-items: center;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  margin: 8px 0;
`;

export const CommunityList = styled.FlatList`
  margin: 0 -16px;
  padding: 0 16px;
`;
