import React from "react";
import {
  ReviewCardContainer,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  ReviewDate,
  Rating,
  ReviewText,
} from "./styles";

const ReviewCard = ({ review, testID }) => {
  const { reviewer, createdAt, rating, comment } = review;

  return (
    <ReviewCardContainer testID={testID}>
      <UserInfo>
        <UserAvatar
          source={{ uri: reviewer?.avatar }}
          testID={`${testID}-avatar`}
        />
        <UserDetails>
          <UserName>{reviewer?.name}</UserName>
          <ReviewDate>
            {new Date(createdAt).toLocaleDateString("pt-BR")}
          </ReviewDate>
        </UserDetails>
        <Rating>{rating} ⭐</Rating>
      </UserInfo>
      <ReviewText>{comment}</ReviewText>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
