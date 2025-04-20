import styled from "styled-components/native";
import { getStatusColor } from "../../constants/orderStatus";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const StatusBadge = styled.View`
  background-color: ${({ status, theme }) => `${getStatusColor(status)}15`};
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

export const StatusText = styled.Text`
  color: ${({ status }) => getStatusColor(status)};
  font-weight: 600;
  font-size: 14px;
  margin-left: 6px;
`;

export const ServiceInfoContainer = styled.View`
  margin-bottom: 16px;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const UserRole = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${({ variant, theme }) =>
    variant === "secondary"
      ? `${theme.colors.primary}15`
      : theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: ${({ noMargin }) => (noMargin ? "0" : "8px 0")};
  flex: ${({ variant }) => (variant === "secondary" ? "0.48" : "1")};
`;

export const QuotationCard = styled.View`
  background-color: #fff;
  margin: 12px 16px;
  border-radius: 12px;
  elevation: 2;
  border-left-width: 4px;
  border-left-color: ${({ status }) => getStatusColor(status)};
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const ServiceInfo = styled.View`
  margin-bottom: 16px;
`;

export const MainContent = styled.ScrollView`
  flex: 1;
`;

export const Card = styled.View`
  background-color: #fff;
  margin: 12px 16px;
  border-radius: 12px;
  elevation: 2;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const CardHeader = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardContent = styled.View`
  padding: 16px;
`;

export const DetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const DetailLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  text-align: right;
  margin-left: 8px;
`;

export const ActionIconButton = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
`;

export const IconWithText = styled.TouchableOpacity`
  align-items: center;
`;

export const IconLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const TabHeader = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
`;

export const TabButtonText = styled.Text`
  font-size: 15px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.text.secondary};
`;

export const HighlightedInfo = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

export const HighlightedValue = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HighlightedLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const SubActionButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-self: center;
  margin-top: 12px;
`;

export const SubActionButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 13px;
  margin-left: 8px;
`;

export const ActionButtonText = styled.Text`
  color: ${({ variant, theme }) =>
    variant === "secondary" ? theme.colors.primary : "#fff"};
  font-weight: 600;
  font-size: 15px;
  margin-left: ${({ hasIcon }) => (hasIcon ? "8px" : "0")};
`;

export const StickyFooter = styled.View`
  background-color: #fff;
  padding: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px -2px;
    shadow-opacity: 0.05;
    shadow-radius: 3px;
  `}
  elevation: 4;
`;

export const CategoryBadge = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  padding: 4px 12px;
  border-radius: 16px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

export const CategoryText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ServiceImageContainer = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AddressContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
  justify-content: flex-end;
`;

export const AddressText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  text-align: right;
`;

export const LocationIcon = styled.View`
  margin-right: 4px;
  margin-top: 2px;
`;

// Progress tracking components
export const ProgressWrapper = styled.View`
  padding: 12px 0;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const ProgressLine = styled.View`
  position: absolute;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  top: 9px;
  left: 10px;
  right: 10px;
`;

export const ProgressStage = styled.View`
  align-items: center;
  z-index: 1;
  width: 18%;
`;

export const ProgressStageCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ completed, current, isRejected, theme }) => {
    if (isRejected) return getStatusColor("QUOTE_REJECTED");
    if (completed) return theme.colors.primary;
    if (current) return "#fff";
    return theme.colors.border;
  }};
  border-width: ${({ current }) => (current ? 2 : 0)}px;
  border-color: ${({ current, theme }) =>
    current ? theme.colors.primary : "transparent"};
`;

export const ProgressStageText = styled.Text`
  font-size: 11px;
  text-align: center;
  margin-top: 6px;
  font-weight: ${({ completed, current }) =>
    completed || current ? "600" : "400"};
  color: ${({ completed, current, theme }) => {
    if (completed) return theme.colors.primary;
    if (current) return theme.colors.primary;
    return theme.colors.text.secondary;
  }};
`;

// History tab components
export const HistoryItem = styled.View`
  padding: 12px 0;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const HistoryItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const HistoryItemStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HistoryItemDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const HistoryItemContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 12px;
  border-radius: 8px;
`;

export const HistoryItemAmount = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6px;
`;

export const HistoryItemDetail = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const NoHistoryText = styled.Text`
  text-align: center;
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
`;

// Quotation components
export const QuotationDate = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 12px;
`;

export const QuotationDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
`;

export const QuotationActions = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 16px;
`;

// User profile components
export const UserCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const UserInfoContainer = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const UserInfoTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
`;

export const UserInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const ReviewSummary = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: 4px;
`;

export const RatingCount = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: 4px;
`;

export const UserInfoIcon = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const UserInfoText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

export const ActionQuotationButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 16px;
`;

export const ActionQuotationButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  margin-left: 8px;
`;
