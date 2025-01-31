import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  elevation: 2;
`;

export const MethodOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary + "10" : "#fff"};
`;

export const MethodIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary + "20"};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const MethodInfo = styled.View`
  flex: 1;
`;

export const MethodTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const MethodDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SelectedIndicator = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const SelectedDot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const CompactContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CompactMethodIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  align-items: center;
  justify-content: center;
`;

export const CompactMethodInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const CompactMethodTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CompactMethodDescription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;
