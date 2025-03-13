import React from "react";
import { SearchContainer, SearchInput, SearchIcon } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({ placeholder, value = "", onChangeText, onSubmit }) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Icon name="search" size={20} color="#666" />
      </SearchIcon>
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </SearchContainer>
  );
};

export default SearchBar;
