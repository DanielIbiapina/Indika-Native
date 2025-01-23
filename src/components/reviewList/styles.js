import styled from "styled-components/native";

export const ReviewContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReviewCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;

  /* Sombra mais suave mas mais presente */
  shadow-color: ${({ theme }) => theme.colors.text.primary};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;

  /* Elevation um pouco maior para Android */
  elevation: 3;

  /* Background com um toque sutil de gradiente */
  background-color: #ffffff;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.03);
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
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
  color: #444;
  font-size: 14px;
  line-height: 20px;
`;

export const EmptyReviews = styled.Text`
  text-align: center;
  padding: 32px;
  color: #666;
  background-color: #fff;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;
