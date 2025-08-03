import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { reviewService } from "../../services/reviewService";
import { useRoute } from "@react-navigation/native";
import ReviewCard from "../../components/reviewCard";
import { Container, LoadMoreButton, LoadMoreButtonText } from "./styles";

const AllReviews = () => {
  const route = useRoute();
  const { userId } = route.params;

  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async (page = 1) => {
    try {
      setLoading(true);

      // Passar parâmetros de paginação para a API
      const response = await reviewService.listReceivedReviews(userId, {
        page,
        limit: 8, // Definir um limite por página
      });

      if (response && response.reviews) {
        if (page === 1) {
          // Primeira página: substituir os dados
          setReviews(response.reviews);
        } else {
          // Páginas subsequentes: adicionar aos dados existentes
          setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
        }

        // Verificar se há mais páginas
        const totalPages = Math.ceil(response.pagination.total / 8);
        setHasMoreReviews(page < totalPages);
        setReviewsPage(page);
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreReviews) {
      loadReviews(reviewsPage + 1);
    }
  };

  return (
    <Container>
      <ScrollView>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {hasMoreReviews && (
          <LoadMoreButton onPress={handleLoadMore} disabled={loading}>
            <LoadMoreButtonText>
              {loading ? "Carregando..." : "Carregar mais avaliações"}
            </LoadMoreButtonText>
          </LoadMoreButton>
        )}
      </ScrollView>
    </Container>
  );
};

export default AllReviews;
