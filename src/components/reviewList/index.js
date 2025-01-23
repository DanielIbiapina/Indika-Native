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

const ReviewList = ({ reviews, emptyMessage }) => {
  if (!reviews?.length) {
    return (
      <EmptyReviews>{emptyMessage || "Ainda não há avaliações"}</EmptyReviews>
    );
  }

  return (
    <ScrollView>
      <ReviewContainer>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <UserInfo>
              <UserAvatar source={{ uri: review.client.avatar }} />
              <UserDetails>
                <UserName>{review.client.name}</UserName>
                <ReviewDate>
                  {format(new Date(review.createdAt), "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </ReviewDate>
              </UserDetails>
              <Rating>{review.rating} ⭐</Rating>
            </UserInfo>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewContainer>
    </ScrollView>
  );
};

export default ReviewList;
