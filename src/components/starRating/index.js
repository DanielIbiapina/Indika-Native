import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Usando ícones do Expo
import { StarContainer, Star } from "./styles";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < rating;
    return (
      <Star key={index} filled={isFilled}>
        <Ionicons name="star" size={24} />
      </Star>
    );
  });

  return <StarContainer>{stars}</StarContainer>;
};

export default StarRating;
