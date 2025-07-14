import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 16px;
  line-height: 22px;
`;

export const MaxLimitText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 24px;
  font-weight: 600;
`;

export const SubcategoryItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 4px 0;
  border-radius: 12px;
  background-color: ${({ selected, disabled, theme }) => {
    if (disabled) return "#f8f8f8";
    if (selected) return theme.colors.primary;
    return "#fff";
  }};
  border: 1px solid
    ${({ selected, disabled, theme }) => {
      if (disabled) return "#e8e8e8";
      if (selected) return theme.colors.primary;
      return "#e0e0e0";
    }};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  elevation: ${({ selected }) => (selected ? 3 : 1)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ selected }) => (selected ? 0.15 : 0.05)};
  shadow-radius: 3px;
`;

export const SubcategoryName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ selected, disabled, theme }) => {
    if (disabled) return "#999";
    if (selected) return "#fff";
    return theme.colors.text.primary;
  }};
  flex: 1;
`;

export const CheckboxContainer = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid ${({ selected, theme }) => (selected ? "#fff" : "#ddd")};
  background-color: ${({ selected, theme }) =>
    selected ? "rgba(255,255,255,0.2)" : "transparent"};
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({ canConfirm, theme }) =>
    canConfirm ? theme.colors.primary : "#e0e0e0"};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 8px;
`;

export const ConfirmButtonText = styled.Text`
  color: ${({ canConfirm }) => (canConfirm ? "#fff" : "#999")};
  font-size: 16px;
  font-weight: 600;
`;
