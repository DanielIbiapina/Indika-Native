import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const FilterButton = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "#fff"};
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.border};
`;

export const FilterText = styled.Text`
  color: ${({ active, theme }) =>
    active ? "#fff" : theme.colors.text.primary};
  font-size: 14px;
`;

export const TransactionList = styled.FlatList`
  flex: 1;
  padding: 16px;
`;

export const TransactionCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  elevation: 2;
`;

export const TransactionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Amount = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ income, theme }) =>
    income ? theme.colors.success : theme.colors.primary};
`;

export const TransactionInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatusBadge = styled.View`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return theme.colors.success + "20";
      case "pending":
        return theme.colors.warning + "20";
      case "failed":
        return theme.colors.error + "20";
      default:
        return theme.colors.border;
    }
  }};
`;

export const StatusText = styled.Text`
  font-size: 12px;
  color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return theme.colors.success;
      case "pending":
        return theme.colors.warning;
      case "failed":
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 16px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const ListContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;
