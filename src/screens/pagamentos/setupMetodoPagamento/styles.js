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

export const MethodSection = styled.View`
  margin-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

export const MethodHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const MethodTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MethodInput = styled.TextInput`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const MethodInputLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 24px;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const PixTypeSelector = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const PixTypeSelectorText = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#f5f5f5"};
`;

export const PixTypeLabel = styled.Text`
  color: ${({ selected }) => (selected ? "#fff" : "#666")};
  font-size: 14px;
`;
