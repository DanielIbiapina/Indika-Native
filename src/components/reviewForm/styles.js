import styled from "styled-components/native";

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

export const StarButton = styled.TouchableOpacity`
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
  margin-top: 16px;
`;

export const RecommendationButton = styled.TouchableOpacity`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  background-color: #ddd;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;
