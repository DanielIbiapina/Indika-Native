import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ReviewContainer,
  ReviewCard,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  ReviewDate,
  Rating,
  ReviewText,
  EmptyReviews,
} from "./styles";
import { ScrollView } from "react-native";

const ReviewList = ({ reviews = [], emptyMessage, testID }) => {
  const formatReviewDate = (date) => {
    try {
      return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };

  if (!reviews?.length) {
    return (
      <EmptyReviews testID={`${testID}-empty`}>
        {emptyMessage || "Ainda não há avaliações"}
      </EmptyReviews>
    );
  }

  return (
    <ScrollView testID={testID}>
      <ReviewContainer>
        {reviews.map((review) => (
          <ReviewCard key={review.id} testID={`${testID}-review-${review.id}`}>
            <UserInfo>
              <UserAvatar
                source={{ uri: review.client?.avatar }}
                //defaultSource={require("../../assets/default-avatar.png")}
              />
              <UserDetails>
                <UserName>{review.client?.name || "Usuário"}</UserName>
                <ReviewDate>{formatReviewDate(review.createdAt)}</ReviewDate>
              </UserDetails>
              <Rating>{review.rating?.toFixed(1) || "0.0"} ⭐</Rating>
            </UserInfo>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewContainer>
    </ScrollView>
  );
};

export default ReviewList;
