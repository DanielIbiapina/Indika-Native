import styled from "styled-components/native";

export const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 3;
`;

export const CardPressable = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  gap: 12px;
  align-items: center;
  active-opacity: 0.95;
`;

export const ServiceImage = styled.Image`
  width: 60px;
  height: 60px;
  resize-mode: cover;
  border-radius: 8px;
`;

export const ImagePlaceholder = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
`;

export const ServiceInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ServiceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  margin-right: 8px;
`;

export const StatusBadge = styled.View`
  padding: 2px 6px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? "#E8F5E8" : "#FFF2E8")};
`;

export const StatusText = styled.Text`
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? "#4CAF50" : "#FF9800")};
`;

export const CategoryText = styled.Text`
  color: #666;
  font-size: 13px;
  margin-bottom: 6px;
`;

export const ServiceFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const RatingText = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const QuickActions = styled.View`
  flex-direction: column;
  gap: 4px;
`;

export const QuickActionButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 6px;
  background-color: #f8f8f8;

  &:active {
    opacity: 0.7;
  }
`;
