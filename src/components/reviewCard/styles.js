import styled from "styled-components/native";

export const ReviewCardContainer = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px; /* Espaçamento entre os cards */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4; /* Para Android */
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 11px;
`;

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const UserDetails = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const UserName = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ReviewDate = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Rating = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: auto;
`;

export const ReviewText = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  line-height: 20px;
`;
