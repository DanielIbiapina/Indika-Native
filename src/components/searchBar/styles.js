import styled from "styled-components/native";

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  margin: 16px auto;
  width: 100%;
  max-width: 768px;
  box-sizing: border-box;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;

  &:focus {
    background-color: #eef0f2;
    shadow-opacity: 0.1;
  }
`;

export const SearchIcon = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  color: #666;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: ${({ theme }) => {
    return theme?.colors?.text?.primary || "#000";
  }};
  padding: 0;
  width: 100%;
  height: 24px;

  &::placeholder {
    color: #666;
    font-size: 15px;
  }
`;
