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
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
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

export const BookingButton = styled.TouchableOpacity.attrs((props) => ({
  testID: props.testID || "booking-button",
}))`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
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
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
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

export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const DateTimeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const DateTimeText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TextInput = styled.TextInput`
  min-height: 120px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  line-height: 24px;
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

export const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ProviderInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 8px;
  gap: 8px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const ProviderName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Rating = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Separator = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-horizontal: 4px;
`;

export const PeriodSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const PeriodOption = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#fff"};
  border-radius: 8px;
  margin-horizontal: 4px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.border};
`;

export const PeriodText = styled.Text`
  color: ${({ selected, theme }) =>
    selected ? "#fff" : theme.colors.text.primary};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

export const TimeOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const TimeOptionText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: 8px;
`;
