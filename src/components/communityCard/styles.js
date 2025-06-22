import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  width: ${(props) => props.width || 280}px;
  height: ${(props) => props.height || 280}px;
  elevation: 4;
  margin: 4px 8px;
`;

export const CommunityImage = styled.Image`
  width: 100%;
  height: 120px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const Content = styled.View`
  padding: 12px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Description = styled.Text`
  font-size: 13px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  number-of-lines: 2;
`;

export const Stats = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatsText = styled.Text`
  margin-left: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Categories = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CategoryTag = styled.Text`
  padding: 4px 8px;
  font-size: 11px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Container = styled.TouchableOpacity`
  width: ${(props) => props.theme.metrics.screenWidth * 0.8}px;
  margin-horizontal: 10px;
  margin-vertical: 5px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  elevation: 2;
`;
