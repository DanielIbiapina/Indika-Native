import styled from "styled-components/native";

export const Container = styled.View`
  padding: 16px;
  background-color: #f5f5f5;
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

export const LoginBanner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  margin-vertical: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 2;
`;

export const LoginText = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const LoginButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

export const LoginButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const CategoryList = styled.FlatList`
  margin-vertical: 16px;
`;

export const ServicesSection = styled.View`
  margin-top: 24px;
`;

export const SectionTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitleText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ViewAllText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.accent};
`;

export const ServiceList = styled.FlatList`
  padding-vertical: 8px;
`;

export const LocationIndicator = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  padding: 12px 16px;
  margin: 0 0px 16px 0px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const LocationText = styled.Text`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: #422680;
  font-weight: 500;
`;
