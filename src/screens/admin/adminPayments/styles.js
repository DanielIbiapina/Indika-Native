import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 40px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #422680;
`;

export const PaymentList = styled.FlatList`
  padding: 20px;
`;

export const PaymentCard = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  elevation: 2;
`;

export const PaymentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

export const Amount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #422680;
`;

export const PaymentInfo = styled.View`
  margin-bottom: 15px;
`;

export const ClientName = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const ProviderName = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
  align-items: center;
`;

export const RejectButton = styled.TouchableOpacity`
  background-color: #dc3545;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-left: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
