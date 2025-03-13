import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContentCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  elevation: 2;
  margin-bottom: 16px;
`;

export const InstructionItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const InstructionNumber = styled.Text`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  text-align: center;
  line-height: 32px;
  font-weight: 600;
  margin-right: 16px;
`;

export const InstructionText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const MPButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  margin-top: 16px;
`;

export const MPButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const TipCard = styled.View`
  background-color: ${(props) => `${props.theme.colors.primary}10`};
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const TipText = styled.Text`
  flex: 1;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 12px;
`;

export const InfoSection = styled.View`
  padding: 0 8px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 20px;
  text-align: center;
`;
