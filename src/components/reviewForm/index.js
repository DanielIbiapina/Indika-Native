import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import {
  FormContainer,
  RatingContainer,
  StarButton,
  TextArea,
  SubmitButton,
  ErrorMessage,
  RecommendationButtons,
  RecommendationButton,
} from "./styles";

const ReviewForm = ({ orderId, onSubmit, setRecommendationStatus }) => {
  const { signed: isLoggedIn } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("Você precisa estar logado para enviar uma avaliação");
      return;
    }

    if (rating === 0) {
      setError("Por favor, selecione uma classificação");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onSubmit({
        orderId,
        rating,
        comment,
      });
      setComment("");
      setRating(0);
    } catch (err) {
      setError(err.message || "Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <RatingContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton
            key={star}
            type="button"
            selected={star <= rating}
            onPress={() => setRating(star)}
          >
            ⭐
          </StarButton>
        ))}
      </RatingContainer>

      <TextArea
        placeholder="Conte sua experiência..."
        value={comment}
        onChangeText={(text) => setComment(text)}
        required
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <RecommendationButtons>
        <RecommendationButton
          onPress={() =>
            setRecommendationStatus("Você recomendou esta pessoa.")
          }
        >
          Indicar
        </RecommendationButton>
        <RecommendationButton
          onPress={() =>
            setRecommendationStatus("Você não recomendou este serviço.")
          }
        >
          Não Indicar
        </RecommendationButton>
      </RecommendationButtons>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar avaliação"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ReviewForm;
