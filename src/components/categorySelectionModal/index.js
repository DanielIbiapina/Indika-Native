import React, { useState } from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryPicker from "../categoryPicker";
import SubcategoryPicker from "../subcategoryPicker";
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  BackButton,
} from "./styles";

const CategorySelectionModal = ({
  visible,
  onClose,
  selectedCategory,
  selectedSubcategories = [],
  onSelect,
  title = "Selecionar Categoria",
}) => {
  const [step, setStep] = useState(1); // 1 = categoria, 2 = subcategorias
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempSubcategories, setTempSubcategories] = useState(
    selectedSubcategories
  );

  const handleCategorySelect = (category) => {
    setTempCategory(category);
    setTempSubcategories([]); // Reset subcategorias
    setStep(2); // Ir para etapa de subcategorias
  };

  const handleSubcategoriesConfirm = () => {
    // Retornar categoria + subcategorias
    onSelect({
      category: tempCategory,
      subcategories: tempSubcategories,
    });
    onClose();
    setStep(1); // Reset para próxima abertura
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    setStep(1); // Reset
    onClose();
  };

  const getCurrentTitle = () => {
    if (step === 1) return title;
    return `Selecionar Subcategorias - ${tempCategory}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <Container>
        <Header>
          {step === 2 && (
            <BackButton onPress={handleBack}>
              <MaterialIcons name="arrow-back" size={24} color="#333" />
            </BackButton>
          )}
          <Title>{getCurrentTitle()}</Title>
          <CloseButton onPress={handleClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </CloseButton>
        </Header>

        <Content>
          {step === 1 ? (
            <CategoryPicker
              selectedCategory={tempCategory}
              onSelect={handleCategorySelect}
            />
          ) : (
            <SubcategoryPicker
              category={tempCategory}
              selectedSubcategories={tempSubcategories}
              onSubcategoriesChange={setTempSubcategories}
              onConfirm={handleSubcategoriesConfirm}
            />
          )}
        </Content>
      </Container>
    </Modal>
  );
};

export default CategorySelectionModal;
