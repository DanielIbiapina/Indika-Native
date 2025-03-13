import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { reviewService } from "../../services/reviewService"; // Importar o serviço de avaliações
import { useRoute } from "@react-navigation/native";
import ReviewCard from "../../components/reviewCard"; // Componente de avaliação
import { Container, LoadMoreButton, LoadMoreButtonText } from "./styles"; // Estilos

const AllReviews = () => {
  const route = useRoute();
  const { userId } = route.params; // Recebe o userId como parâmetro da rota

  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async (page = 1) => {
    try {
      const response = await reviewService.listReceivedReviews(userId);
      if (response && response.reviews) {
        setReviews(
          page === 1 ? response.reviews : [...reviews, ...response.reviews]
        );
        setHasMoreReviews(response.pagination.total > reviews.length);
        setReviewsPage(page);
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    }
  };

  return (
    <Container>
      <ScrollView>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {hasMoreReviews && (
          <LoadMoreButton onPress={() => loadReviews(reviewsPage + 1)}>
            <LoadMoreButtonText>Carregar mais avaliações</LoadMoreButtonText>
          </LoadMoreButton>
        )}
      </ScrollView>
    </Container>
  );
};

export default AllReviews;
