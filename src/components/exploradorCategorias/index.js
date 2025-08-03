import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CATEGORIES } from "../../constants/categories";
import { Ionicons } from "@expo/vector-icons";
import {
  ModalContainer,
  ModalContent,
  Header,
  CloseButton,
  Title,
  CategorySection,
  CategoryTitle,
  SubcategoryGrid,
  SubcategoryChip,
  SubcategoryText,
  Overlay,
} from "./styles";

const { height: screenHeight } = Dimensions.get("window");

const ExploradorCategorias = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleSubcategoryPress = (category, subcategory) => {
    // Fechar modal e navegar
    onClose();
    navigation.navigate("ServicosPorCategoria", {
      category,
      initialSubcategory: subcategory,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <Overlay onPress={onClose} />
        <ModalContent>
          <Header>
            <Title>🔍 Explorar Especialidades</Title>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </CloseButton>
          </Header>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {Object.entries(CATEGORIES).map(([categoryName, categoryData]) => (
              <CategorySection key={categoryName}>
                <CategoryTitle>{categoryName}</CategoryTitle>
                <SubcategoryGrid>
                  {categoryData.subcategories?.map((subcategory) => (
                    <SubcategoryChip
                      key={subcategory}
                      onPress={() =>
                        handleSubcategoryPress(categoryName, subcategory)
                      }
                    >
                      <SubcategoryText>{subcategory}</SubcategoryText>
                    </SubcategoryChip>
                  ))}
                </SubcategoryGrid>
              </CategorySection>
            ))}
          </ScrollView>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ExploradorCategorias;
