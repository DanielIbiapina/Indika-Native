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
  color: #333;
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
  color: #333;
`;

export const ViewAllText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.accent};
`;

export const ServiceList = styled.FlatList`
  padding-vertical: 8px;
`;
