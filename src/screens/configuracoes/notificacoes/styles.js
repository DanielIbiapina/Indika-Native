import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Section = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 16px;
`;

export const NotificationItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: ${(props) => (props.last ? "0" : "1px")};
  border-bottom-color: #f0f0f0;
`;

export const TextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
`;

export const NotificationText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const NotificationDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

export const Switch = styled.Switch.attrs((props) => ({
  trackColor: { false: "#ddd", true: `${props.theme.colors.primary}50` },
  thumbColor: props.value ? props.theme.colors.primary : "#fff",
}))``;

export const LoadingSpinner = styled(ActivityIndicator).attrs((props) => ({
  color: props.theme.colors.primary,
  size: props.size || "small",
}))`
  margin: 16px 0;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin: 16px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
