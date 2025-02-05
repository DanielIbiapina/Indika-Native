import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 0 12px;
  elevation: 2;
`;

export const SearchIcon = styled.View`
  padding: 12px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 12px;
  font-size: 16px;
`;

export const Section = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 16px;
`;

export const HelpItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: ${(props) => (props.last ? "0" : "1px")};
  border-bottom-color: #f0f0f0;
`;

export const ItemTitle = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 12px;
`;

export const ItemDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

export const Chevron = styled.View`
  padding-left: 8px;
`;

export const FAQItem = styled.TouchableOpacity`
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const FAQQuestion = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FAQAnswer = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  line-height: 20px;
  padding: 8px 0;
`;

export const ContactContainer = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 24px;
  align-items: center;
  elevation: 2;
`;

export const ContactTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const ContactInfo = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
  margin: 16px 0;
`;

export const ContactButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const ContactButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const VersionInfo = styled.View`
  padding: 24px;
  align-items: center;
`;

export const VersionText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
`;
