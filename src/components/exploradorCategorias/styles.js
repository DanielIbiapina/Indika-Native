import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Overlay = styled.TouchableOpacity`
  flex: 1;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: ${screenHeight * 0.9}px;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const CategorySection = styled.View`
  margin-bottom: 24px;
`;

export const CategoryTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #422680;
  margin-bottom: 12px;
`;

export const SubcategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SubcategoryChip = styled.TouchableOpacity`
  background-color: #f8f9fa;
  padding: 10px 16px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #e9ecef;
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const SubcategoryText = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: 500;
`;
