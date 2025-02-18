import styled from "styled-components/native";

// Definindo os componentes estilizados
export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButtonText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: #666;
`;

export const CommunityCard = styled.View`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const CommunityImage = styled.Image`
  width: 100%;
  height: 300px;
  resize-mode: cover;
`;

export const Content = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 28px;
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  color: #666;
  margin-bottom: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 40%;
`;

export const InfoText = styled.Text`
  margin-left: 8px;
  color: #666;
`;

export const CategoryTag = styled.View`
  background-color: ${({ theme }) => theme.colors.primary}15;
  padding: 4px;
  border-radius: 16px;
`;

export const CategoryText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${({ bgColor }) => bgColor || "#422680"};
  border-radius: 8px;
`;

export const ActionButtonText = styled.Text`
  color: white;
  margin-left: 8px;
`;

export const MemberList = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const SectionSubtitle = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

export const MemberItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const MemberAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
  background-color: #f0f0f0;
`;

export const MemberInfo = styled.View`
  flex: 1;
`;

export const MemberName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const AdminText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 4px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${({ theme }) => `${theme.colors.error}15`};
  border-radius: 16px;
  margin-left: 8px;
`;

export const RemoveButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  font-weight: 500;
`;
