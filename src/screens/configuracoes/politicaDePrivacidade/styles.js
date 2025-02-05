import styled from "styled-components/native";

// Reutiliza a maioria dos estilos dos Termos de Uso
export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Content = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const LastUpdateInfo = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  font-style: italic;
`;

export const Section = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 20px;
  margin-bottom: 12px;
`;

export const BulletPoint = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  padding-left: 8px;
`;

export const BulletText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 8px;
  flex: 1;
`;

export const Emphasis = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  margin-top: 8px;
`;

export const DownloadButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 16px;
  border-radius: 12px;
  margin: 24px 0;
`;

export const ButtonIcon = styled.View`
  margin-right: 12px;
`;

export const DownloadButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
