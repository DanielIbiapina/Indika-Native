import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-top: 16px;
`;

export const BackButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  margin-left: 8px;
`;

export const ServiceInfo = styled.View`
  margin-bottom: 24px;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 200px;
`;

export const ServiceDetails = styled.View`
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  margin: -20px 16px 0;
  elevation: 4;
`;

export const ServiceTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-vertical: 8px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 16px;
  line-height: 24px;
`;

export const BookingButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  elevation: 2;
`;

export const BookingButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const RecommendationsSection = styled.View`
  margin: 24px 16px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

export const RecommendationHeader = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const RecommendationCards = styled.View`
  gap: 12px;
`;

export const RecommendationCard = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 12px;
  background-color: #fff;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  elevation: 2;
  padding: 8px;
  gap: 12px;
  position: relative;
`;

export const CommunityImage = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-right: 80px;
`;

export const CommunityName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RecommendationCount = styled.View`
  position: absolute;
  right: -25px;
  top: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 4px 12px;
  min-width: 100px;
  align-items: center;
  elevation: 5;
  z-index: 1;
`;

export const CountText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const ReviewsSection = styled.View`
  margin: 24px 16px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const BookingForm = styled.View`
  margin: 24px 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  elevation: 2;
`;

export const TextInput = styled.TextInput`
  height: 48px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 8px 16px;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme, secondary }) =>
    secondary ? theme.colors.background : theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 8px;
  elevation: 2;
`;

export const ButtonText = styled.Text`
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.text.primary : "#fff"};
  font-size: 16px;
  font-weight: 500;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const LoadingSpinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: "large",
  color: theme.colors.primary,
}))`
  margin: 20px 0;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  margin: 16px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;
