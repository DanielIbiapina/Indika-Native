import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 24px 16px 12px 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CategoryItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin: 4px 16px;
  border-radius: 12px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#fff"};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.primary : "#e0e0e0")};
  elevation: ${({ selected }) => (selected ? 3 : 1)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ selected }) => (selected ? 0.15 : 0.05)};
  shadow-radius: 3px;
`;

export const CategoryIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  background-color: ${({ selected, theme }) =>
    selected ? "rgba(255,255,255,0.2)" : "#f5f5f5"};
`;

export const CategoryName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ selected, theme }) =>
    selected ? "#fff" : theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const CategoryDescription = styled.Text`
  font-size: 13px;
  color: ${({ selected, theme }) =>
    selected ? "rgba(255,255,255,0.8)" : theme.colors.text.secondary};
  line-height: 18px;
`;

export const SelectedBadge = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
