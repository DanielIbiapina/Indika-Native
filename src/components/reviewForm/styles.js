import styled from "styled-components/native";
import { Animated } from "react-native";

export const FormContainer = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

export const StarButton = styled.TouchableOpacity``;

export const StarText = styled.Text`
  font-size: 24px;
  opacity: ${({ selected }) => (selected ? 1 : 0.3)};
  transform: scale(${({ selected }) => (selected ? 1.1 : 1)});
`;

export const TextArea = styled.TextInput`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  text-align-vertical: top;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

export const RecommendationButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const RecommendationButton = styled.TouchableOpacity`
  flex: 0.48;
  padding: 15px;
  background-color: ${({ selected, theme }) =>
    selected ? `${theme.colors.primary}15` : "#f5f5f5"};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary : "transparent"};
  flex-direction: row;
  gap: 8px;
`;

export const RecommendationButtonText = styled.Text`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.text.primary};
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export const AnimatedContainer = styled(Animated.View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
