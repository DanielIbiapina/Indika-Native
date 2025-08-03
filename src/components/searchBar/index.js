import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  SuggestionsList,
  SuggestionItem,
  SuggestionText,
} from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CATEGORIES } from "../../constants/categories";

const SearchBar = ({
  placeholder,
  value = "",
  onChangeText,
  onSubmit,
  enableSuggestions = false,
  testID,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ NOVO: Gerar sugestões APENAS se habilitado
  useEffect(() => {
    if (!enableSuggestions) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (value.trim().length > 1) {
      const normalizedInput = value.toLowerCase().trim();
      const allSubcategories = [];

      // Coletar todas as subcategorias com suas categorias
      Object.entries(CATEGORIES).forEach(([categoryName, categoryData]) => {
        if (categoryData.subcategories) {
          categoryData.subcategories.forEach((subcategory) => {
            if (subcategory.toLowerCase().includes(normalizedInput)) {
              allSubcategories.push({
                subcategory,
                category: categoryName,
                type: "subcategory",
              });
            }
          });
        }
      });

      // Limitar a 5 sugestões
      setSuggestions(allSubcategories.slice(0, 5));
      setShowSuggestions(allSubcategories.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, enableSuggestions]);

  // ✅ NOVO: Só esconder sugestões quando realmente necessário
  const handleSuggestionPress = (suggestion) => {
    onChangeText(suggestion.subcategory);
    setShowSuggestions(false); // Esconder só depois de selecionar

    if (onSubmit) {
      onSubmit();
    }
  };

  // ✅ SEGURO: Handler para submit
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <View>
      <SearchContainer>
        <SearchIcon>
          <Icon name="search" size={20} color="#666" />
        </SearchIcon>
        <SearchInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          onFocus={() => {
            if (enableSuggestions && value.trim().length > 1) {
              setShowSuggestions(true);
            }
          }}
          // ✅ REMOVIDO: onBlur completamente
          returnKeyType="search"
          testID={testID}
          blurOnSubmit={false} // ✅ NOVO: Não perder foco ao submeter
          keyboardShouldPersistTaps="handled" // ✅ NOVO: Teclado não interfere com toques
        />

        {/* ✅ NOVO: Botão X para limpar */}
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onChangeText("");
              setShowSuggestions(false);
            }}
            style={{ padding: 1 }}
          >
            <Icon name="close" size={16} color="#666" />
          </TouchableOpacity>
        )}
      </SearchContainer>

      {/* ✅ NOVO: Lista de sugestões - APENAS se habilitado */}
      {enableSuggestions && showSuggestions && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onPress={() => handleSuggestionPress(suggestion)}
              activeOpacity={0.7}
            >
              <Icon
                name="search"
                size={16}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <SuggestionText>
                <Text style={{ fontWeight: "bold" }}>
                  {suggestion.subcategory}
                </Text>
                <Text style={{ color: "#666" }}> em {suggestion.category}</Text>
              </SuggestionText>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </View>
  );
};

export default SearchBar;
