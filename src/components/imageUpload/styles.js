import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  font-weight: 500;
`;

export const ImagePreview = styled.View`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => `${theme.colors.primary}20`};
`;

export const UploadButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const UploadButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px dashed ${({ theme }) => `${theme.colors.primary}40`};
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.primary}10`};
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;
