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
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const DetailLabel = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DetailLabelText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  text-align: right;
  margin-left: 16px;
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
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
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
  padding: 20px 0;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 0 10px;
`;

export const ProgressStage = styled.View`
  align-items: center;
  flex: 1;
  position: relative;
`;

export const ProgressStageCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ completed, current, isRejected, theme }) => {
    if (isRejected) return getStatusColor("QUOTE_REJECTED");
    if (completed || current) return theme.colors.primary;
    return "#e0e0e0";
  }};
  border-width: ${({ current }) => (current ? 3 : 0)}px;
  border-color: ${({ current, theme }) =>
    current ? theme.colors.primary : "transparent"};
  elevation: ${({ completed, current }) => (completed || current ? 3 : 1)};
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: ${({ completed, current }) =>
      completed || current ? 0.2 : 0.1};
    shadow-radius: 3px;
  `}
`;

export const ProgressStageText = styled.Text`
  font-size: 12px;
  text-align: center;
  margin-top: 8px;
  font-weight: ${({ completed, current }) =>
    completed || current ? "600" : "400"};
  color: ${({ completed, current, theme }) => {
    if (completed || current) return theme.colors.primary;
    return theme.colors.text.secondary;
  }};
  max-width: 60px;
`;

export const ProgressLine = styled.View`
  height: 2px;
  background-color: ${({ completed, theme }) =>
    completed ? theme.colors.primary : "#e0e0e0"};
`;

// Componentes para estado cancelado
export const CancelledContainer = styled.View`
  align-items: center;
  padding: 32px 16px;
`;

export const CancelledText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 16px;
  text-align: center;
`;

export const CancelledReason = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 8px;
  text-align: center;
  font-style: italic;
`;

// Melhorar seção de serviço
export const ServiceInfoSection = styled.View`
  margin-bottom: 24px;
  align-items: center;
`;

// Destaque para horário
export const ScheduleHighlight = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => `${theme.colors.primary}08`};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const ScheduleIcon = styled.View`
  margin-right: 16px;
`;

export const ScheduleInfo = styled.View`
  flex: 1;
`;

export const ScheduleDate = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const SchedulePeriod = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Seção de detalhes melhorada
export const DetailsSection = styled.View`
  margin-bottom: 16px;
`;

// Card para observações
export const ObservationsCard = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const ObservationsTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const ObservationsTitleText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ObservationsText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
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
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 12px;
  margin-bottom: 8px;
  text-align: center;
  font-style: italic;
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

// Seção de detalhes do orçamento
export const QuotationDetailsSection = styled.View`
  margin-bottom: 16px;
`;

// Preço destacado
export const QuotationPrice = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
  flex: 1;
  margin-left: 16px;
`;

// Card para descrição do prestador
export const QuotationDescriptionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
  border-left-width: 3px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const QuotationDescriptionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
`;

export const QuotationDescriptionTitleText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// === COMPONENTES DO ORÇAMENTO - Novo design ===
export const QuotationValueContainer = styled.View`
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

export const QuotationValueMain = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
`;

export const QuotationValueLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const QuotationDetailsGrid = styled.View`
  gap: 16px;
  margin-bottom: 20px;
`;

export const QuotationDetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

export const QuotationDetailIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const QuotationDetailContent = styled.View`
  flex: 1;
`;

export const QuotationDetailLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2px;
`;

export const QuotationDetailValue = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const QuotationMessageCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const QuotationMessageTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const QuotationMessageText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
`;

export const QuotationButtonsContainer = styled.View`
  gap: 12px;
`;

export const QuotationAcceptButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  gap: 8px;
`;

export const QuotationRejectButton = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: #dc3545;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  gap: 8px;
`;

export const QuotationButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const QuotationRejectButtonText = styled.Text`
  color: #dc3545;
  font-size: 16px;
  font-weight: 600;
`;

// === COMPONENTES DO SERVIÇO - Novo design ===
export const ServiceHeaderSection = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`;

export const ServiceHeaderInfo = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

export const ServiceDetailsGrid = styled.View`
  gap: 16px;
  margin-bottom: 20px;
`;

export const ServiceDetailItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const ServiceDetailIcon = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const ServiceDetailContent = styled.View`
  flex: 1;
`;

export const ServiceDetailLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const ServiceDetailValue = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
`;

export const ClientObservationsCard = styled.View`
  background-color: #fff3cd;
  border-radius: 8px;
  padding: 16px;
  border-left-width: 4px;
  border-left-color: #ffc107;
`;

export const ClientObservationsHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const ClientObservationsTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #856404;
`;

export const ClientObservationsText = styled.Text`
  font-size: 14px;
  color: #856404;
  line-height: 20px;
`;

// === COMPONENTES DA SOLICITAÇÃO DO CLIENTE ===
export const ClientRequestBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #dbeafe;
  padding: 6px 12px;
  border-radius: 16px;
  gap: 4px;
`;

export const ClientRequestBadgeText = styled.Text`
  color: #2563eb;
  font-size: 13px;
  font-weight: 500;
`;

export const ClientRequestGrid = styled.View`
  gap: 16px;
  margin-bottom: 20px;
`;

export const ClientRequestItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

export const ClientRequestIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f9ff;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const ClientRequestContent = styled.View`
  flex: 1;
`;

export const ClientRequestLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2px;
`;

export const ClientRequestValue = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ClientRequestNote = styled.View`
  background-color: #f0f9ff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border-left-width: 4px;
  border-left-color: #2563eb;
`;

export const ClientRequestNoteHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const ClientRequestNoteTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
`;

export const ClientRequestNoteText = styled.Text`
  font-size: 14px;
  color: #1e40af;
  line-height: 20px;
`;

export const ClientRequestFooter = styled.View`
  align-items: center;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const ClientRequestDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`;
