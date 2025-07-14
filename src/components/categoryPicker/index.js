import React from "react";
import { ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CATEGORIES, getCategoriesBySection } from "../../constants/categories";
import {
  Container,
  CategoryItem,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
  SelectedBadge,
  SectionTitle,
  SectionHeader,
} from "./styles";

const CategoryPicker = ({ selectedCategory, onSelect }) => {
  const sections = getCategoriesBySection();

  // ✅ FUNÇÃO: Para obter ícone da seção
  const getSectionIcon = (sectionTitle) => {
    const icons = {
      "Casa e Construção": "home",
      "Serviços Técnicos": "build",
      "Serviços Domésticos": "cleaning-services",
      Educação: "school",
      Eventos: "event",
      "Serviços Pessoais": "face",
      Transporte: "local-shipping",
      Profissionais: "business",
      Tecnologia: "computer",
    };
    return icons[sectionTitle] || "category";
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(sections).map(([sectionTitle, categories]) => (
          <View key={sectionTitle} style={{ marginBottom: 16 }}>
            {/* ✅ HEADER DA SEÇÃO: Com ícone */}
            <SectionHeader>
              <MaterialIcons
                name={getSectionIcon(sectionTitle)}
                size={20}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <SectionTitle>{sectionTitle}</SectionTitle>
            </SectionHeader>

            {/* ✅ CATEGORIAS DA SEÇÃO */}
            {categories.map((categoryName) => {
              const category = CATEGORIES[categoryName];

              // ✅ VERIFICAÇÃO: Categoria existe
              if (!category) {
                console.warn(`Categoria não encontrada: ${categoryName}`);
                return null;
              }

              const isSelected = selectedCategory === categoryName;

              return (
                <CategoryItem
                  key={categoryName}
                  onPress={() => onSelect(categoryName)}
                  selected={isSelected}
                >
                  <CategoryIcon selected={isSelected}>
                    <MaterialIcons
                      name={category.icon}
                      size={24}
                      color={isSelected ? "#fff" : category.color}
                    />
                  </CategoryIcon>

                  <View style={{ flex: 1 }}>
                    <CategoryName selected={isSelected}>
                      {categoryName}
                    </CategoryName>
                    <CategoryDescription selected={isSelected}>
                      {category.subcategories.join(", ")}
                    </CategoryDescription>
                  </View>

                  {isSelected && (
                    <SelectedBadge>
                      <MaterialIcons name="check" size={20} color="#fff" />
                    </SelectedBadge>
                  )}
                </CategoryItem>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

export default CategoryPicker;
