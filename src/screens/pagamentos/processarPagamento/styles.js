import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.View`
  padding-top: 40px;
  padding-left: 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #422680;
  margin-bottom: 10px;
`;

export const ServiceInfo = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

export const AmountLabel = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

export const Amount = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #422680;
  margin-bottom: 20px;
`;

export const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const WebViewContainer = styled.View`
  flex: 1;
  height: 700px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
`;
