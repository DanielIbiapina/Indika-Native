import React, { useState, useCallback } from "react";
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
import { Animated, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { orderService } from "../../services/orderService";
import { emitOrderStatusUpdated } from "../../utils/eventEmitter";
import { useToast } from "../../hooks/useToast";

const RECOMMENDATION_TYPES = {
  INDICA: "indica",
  NAO_INDICA: "nao_indica",
};

const ReviewForm = ({ orderId, onSubmit, setRecommendationStatus, testID }) => {
  const { signed: isLoggedIn } = useAuth();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    recommendation: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [indicaScale] = useState(new Animated.Value(1));
  const [naoIndicaScale] = useState(new Animated.Value(1));

  const validateForm = useCallback(() => {
    if (!isLoggedIn) {
      setError("Você precisa estar logado para enviar uma avaliação");
      return false;
    }

    if (formData.rating === 0) {
      setError("Por favor, selecione uma classificação");
      return false;
    }

    if (!formData.recommendation) {
      setError("Por favor, selecione se você indica ou não o serviço");
      return false;
    }

    return true;
  }, [isLoggedIn, formData]);

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setLoading(true);
      setError("");

      await onSubmit({
        orderId,
        ...formData,
      });

      // 🔥 3. Emitir evento para atualizar as listas
      emitOrderStatusUpdated({ id: orderId, status: "COMPLETED" });

      // Resetar form após sucesso
      setFormData({
        rating: 0,
        comment: "",
        recommendation: null,
      });

      setRecommendationStatus(formData.recommendation);
      showSuccess("Obrigado!", "Avaliação enviada com sucesso");
    } catch (err) {
      setError(err.message || "Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  };

  const animateButton = useCallback((scaleValue) => {
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
  }, []);

  const handleRecommendation = useCallback(
    (value) => {
      setFormData((prev) => ({ ...prev, recommendation: value }));
      animateButton(
        value === RECOMMENDATION_TYPES.INDICA ? indicaScale : naoIndicaScale
      );
    },
    [animateButton, indicaScale, naoIndicaScale]
  );

  return (
    <FormContainer testID={testID}>
      <RatingContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton
            key={star}
            onPress={() => setFormData((prev) => ({ ...prev, rating: star }))}
            testID={`${testID}-star-${star}`}
          >
            <StarText selected={star <= formData.rating}>⭐</StarText>
          </StarButton>
        ))}
      </RatingContainer>

      <TextArea
        placeholder="Conte sua experiência..."
        value={formData.comment}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, comment: text }))
        }
        multiline
        numberOfLines={4}
        testID={`${testID}-comment`}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <RecommendationButtons>
        {Object.entries(RECOMMENDATION_TYPES).map(([key, value]) => (
          <RecommendationButton
            key={value}
            selected={formData.recommendation === value}
            onPress={() => handleRecommendation(value)}
            testID={`${testID}-recommendation-${value}`}
          >
            <AnimatedContainer
              style={{
                transform: [
                  {
                    scale:
                      value === RECOMMENDATION_TYPES.INDICA
                        ? indicaScale
                        : naoIndicaScale,
                  },
                ],
              }}
            >
              <MaterialCommunityIcons
                name={
                  value === RECOMMENDATION_TYPES.INDICA
                    ? "hand-clap"
                    : "hand-pointing-down"
                }
                size={24}
                color={
                  formData.recommendation === value
                    ? value === RECOMMENDATION_TYPES.INDICA
                      ? "#422680"
                      : "#dc3545"
                    : "#666"
                }
              />
              <RecommendationButtonText
                selected={formData.recommendation === value}
              >
                {value === RECOMMENDATION_TYPES.INDICA
                  ? "Indicar"
                  : "Não Indicar"}
              </RecommendationButtonText>
            </AnimatedContainer>
          </RecommendationButton>
        ))}
      </RecommendationButtons>

      <SubmitButton
        onPress={handleSubmit}
        disabled={loading}
        testID={`${testID}-submit`}
      >
        <ButtonText>{loading ? "Enviando..." : "Enviar avaliação"}</ButtonText>
      </SubmitButton>
    </FormContainer>
  );
};

export default ReviewForm;
