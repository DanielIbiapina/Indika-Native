import styled from "styled-components/native";

export const BottomNav = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const NavText = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text.secondary};
`;

//antes era #666666 no lugar de secondary
