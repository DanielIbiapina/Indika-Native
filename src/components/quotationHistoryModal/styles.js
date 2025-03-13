import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 80%;
  padding-bottom: ${Platform.OS === "ios" ? "34px" : "24px"};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.text.secondary}10`};
`;

export const QuotationsList = styled.FlatList`
  padding: 16px;
`;

export const QuotationItem = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-left-width: 4px;
  border-left-color: ${({ status, theme }) =>
    status === "current" ? theme.colors.primary : theme.colors.text.secondary};
  elevation: 2;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const QuotationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const QuotationDate = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatusBadge = styled.View`
  background-color: ${({ status, theme }) =>
    status === "current"
      ? `${theme.colors.primary}15`
      : `${theme.colors.text.secondary}15`};
  padding: 4px 12px;
  border-radius: 12px;
`;

export const StatusText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ status, theme }) =>
    status === "current" ? theme.colors.primary : theme.colors.text.secondary};
`;

export const QuotationAmount = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const QuotationDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 20px;
`;

export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 12px;
  text-align: center;
`;
