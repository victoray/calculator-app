import styled from "styled-components/native";
import React, { FC } from "react";

const StyledButton = styled.TouchableOpacity<{ color: string; flex?: boolean }>`
  background-color: ${(props) => props.color};
  border-radius: 500px;
  width: 75px;
  height: 75px;
  padding: 10px;
  display: flex;
  justify-content: center;
  margin: 5px;
  flex-grow: ${(props) => (props.flex ? 1 : 0)};
  align-items: ${(props) => (props.flex ? "flex-start" : "center")};
  ${(props) => props.flex && "padding-left: 25px;"}
`;

const StyledButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 32px;
`;

const CalculatorButton: FC<{
  title: string | number;
  onPress(): void;
  flex?: boolean;
  isControl?: boolean;
  isOperator?: boolean;
}> = ({ title, isControl, isOperator, flex, onPress }) => {
  const color = isControl ? "lightgrey" : isOperator ? "orange" : "dimgrey";
  return (
    <StyledButton onPress={onPress} color={color} flex={flex}>
      <StyledButtonText>{title}</StyledButtonText>
    </StyledButton>
  );
};

export default CalculatorButton;
