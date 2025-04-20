import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { orderService } from "../../services/orderService"; // Importe sua função de serviço aqui
import {
  Container,
  ModalContent,
  Header,
  HeaderTitle,
  CloseButton,
  QuotationsList,
  QuotationItem,
  QuotationHeader,
  QuotationDate,
  QuotationAmount,
  QuotationDescription,
  StatusBadge,
  StatusText,
  EmptyState,
  EmptyStateText,
} from "./styles";

const QuotationHistoryModal = ({ isVisible, onClose, orderId }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the quotations when the modal is opened
  useEffect(() => {
    if (isVisible) {
      const fetchQuotations = async () => {
        try {
          const response = await orderService.getQuotations(orderId);
          setQuotations(response); // Ajuste de acordo com a estrutura do seu backend
        } catch (error) {
          console.error("Erro ao carregar orçamentos", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuotations();
    }
  }, [isVisible, orderId]); // Re-fetch quando o modal é aberto

  const getQuotationStatus = (index) => {
    if (index === quotations.length - 1) {
      return "current";
    }
    return "old";
  };

  const renderQuotation = ({ item, index }) => (
    <QuotationItem status={getQuotationStatus(index)}>
      <QuotationHeader>
        <QuotationDate>
          {format(new Date(item.createdAt), "dd 'de' MMMM 'às' HH:mm", {
            locale: ptBR,
          })}
        </QuotationDate>
        <StatusBadge status={getQuotationStatus(index)}>
          <StatusText status={getQuotationStatus(index)}>
            {index === quotations.length - 1 ? "Atual" : "Anterior"}
          </StatusText>
        </StatusBadge>
      </QuotationHeader>

      <QuotationAmount>R$ {item.price.toFixed(2)}</QuotationAmount>

      {item.description && (
        <QuotationDescription>{item.description}</QuotationDescription>
      )}
    </QuotationItem>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Container>
        <ModalContent>
          <Header>
            <HeaderTitle>Histórico de Orçamentos</HeaderTitle>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </CloseButton>
          </Header>

          {loading ? (
            <EmptyState>
              <Ionicons name="reload" size={48} color="#666" />
              <EmptyStateText>Carregando...</EmptyStateText>
            </EmptyState>
          ) : quotations.length > 0 ? (
            <QuotationsList
              data={[...quotations].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderQuotation}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <EmptyState>
              <Ionicons name="document-text-outline" size={48} color="#666" />
              <EmptyStateText>Nenhum orçamento encontrado</EmptyStateText>
            </EmptyState>
          )}
        </ModalContent>
      </Container>
    </Modal>
  );
};

export default QuotationHistoryModal;
