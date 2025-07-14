import React from "react";
import { ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CATEGORIES } from "../../constants/categories";
import {
  Container,
  SubcategoryItem,
  SubcategoryName,
  CheckboxContainer,
  InfoText,
  ConfirmButton,
  ConfirmButtonText,
  MaxLimitText,
} from "./styles";

const SubcategoryPicker = ({
  category,
  selectedSubcategories,
  onSubcategoriesChange,
  onConfirm,
}) => {
  const categoryData = CATEGORIES[category];
  const maxSelection = 3;

  if (!categoryData) {
    return (
      <Container>
        <InfoText>Categoria não encontrada</InfoText>
      </Container>
    );
  }

  const handleSubcategoryToggle = (subcategory) => {
    const isSelected = selectedSubcategories.includes(subcategory);

    if (isSelected) {
      // Remover seleção
      onSubcategoriesChange(
        selectedSubcategories.filter((item) => item !== subcategory)
      );
    } else {
      // Adicionar seleção (se não atingiu limite)
      if (selectedSubcategories.length < maxSelection) {
        onSubcategoriesChange([...selectedSubcategories, subcategory]);
      }
    }
  };

  const canConfirm = selectedSubcategories.length > 0;

  return (
    <Container>
      <InfoText>
        Selecione até {maxSelection} subcategorias que representam seus
        serviços:
      </InfoText>

      <MaxLimitText>
        {selectedSubcategories.length}/{maxSelection} selecionadas
      </MaxLimitText>

      <ScrollView showsVerticalScrollIndicator={false}>
        {categoryData.subcategories.map((subcategory) => {
          const isSelected = selectedSubcategories.includes(subcategory);
          const isDisabled =
            !isSelected && selectedSubcategories.length >= maxSelection;

          return (
            <SubcategoryItem
              key={subcategory}
              onPress={() => handleSubcategoryToggle(subcategory)}
              selected={isSelected}
              disabled={isDisabled}
            >
              <SubcategoryName selected={isSelected} disabled={isDisabled}>
                {subcategory}
              </SubcategoryName>

              <CheckboxContainer selected={isSelected}>
                {isSelected && (
                  <MaterialIcons name="check" size={16} color="#fff" />
                )}
              </CheckboxContainer>
            </SubcategoryItem>
          );
        })}
      </ScrollView>

      <ConfirmButton
        onPress={onConfirm}
        disabled={!canConfirm}
        canConfirm={canConfirm}
      >
        <ConfirmButtonText canConfirm={canConfirm}>
          Confirmar Seleção
        </ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

export default SubcategoryPicker;
