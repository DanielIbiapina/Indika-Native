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
  StarText,
  RecommendationButtonText,
  ButtonText,
  AnimatedContainer,
} from "./styles";
import { Animated } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ReviewForm = ({ orderId, onSubmit, setRecommendationStatus }) => {
  const { signed: isLoggedIn } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [indicaScale] = useState(new Animated.Value(1));
  const [naoIndicaScale] = useState(new Animated.Value(1));

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

  const animateButton = (scaleValue) => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRecommendation = (value) => {
    setRecommendation(value);
    if (value === "indica") {
      animateButton(indicaScale);
    } else {
      animateButton(naoIndicaScale);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <RatingContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton key={star} type="button" onPress={() => setRating(star)}>
            <StarText selected={star <= rating}>⭐</StarText>
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
          selected={recommendation === "indica"}
          onPress={() => handleRecommendation("indica")}
        >
          <AnimatedContainer style={{ transform: [{ scale: indicaScale }] }}>
            <MaterialCommunityIcons
              name="hand-clap"
              size={24}
              color={recommendation === "indica" ? "#422680" : "#666"}
            />
            <RecommendationButtonText selected={recommendation === "indica"}>
              Indicar
            </RecommendationButtonText>
          </AnimatedContainer>
        </RecommendationButton>

        <RecommendationButton
          selected={recommendation === "nao_indica"}
          onPress={() => handleRecommendation("nao_indica")}
        >
          <AnimatedContainer style={{ transform: [{ scale: naoIndicaScale }] }}>
            <MaterialCommunityIcons
              name="hand-pointing-down"
              size={24}
              color={recommendation === "nao_indica" ? "#dc3545" : "#666"}
            />
            <RecommendationButtonText
              selected={recommendation === "nao_indica"}
            >
              Não Indicar
            </RecommendationButtonText>
          </AnimatedContainer>
        </RecommendationButton>
      </RecommendationButtons>

      <SubmitButton onPress={handleSubmit} disabled={loading}>
        <ButtonText>{loading ? "Enviando..." : "Enviar avaliação"}</ButtonText>
      </SubmitButton>
    </FormContainer>
  );
};

export default ReviewForm;
