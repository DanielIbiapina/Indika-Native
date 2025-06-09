import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Slide = styled.View`
  width: ${width}px;
  padding: 40px;
  justify-content: center;
  align-items: center;
`;

export const SlideImage = styled.Image`
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
`;

export const SlideTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

export const SlideDescription = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const BottomContainer = styled.View`
  padding: 20px;
`;

export const Pagination = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "#ccc"};
  margin: 0 5px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SkipButton = styled.TouchableOpacity`
  padding: 12px;
`;

export const SkipText = styled.Text`
  color: #666;
  font-size: 16px;
`;

export const NextButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px 24px;
  border-radius: 8px;
`;

export const NextText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
