import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

const StyledView = styled.View`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.TouchableOpacity<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 500px;
  width: 75px;
  height: 75px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const StyledButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 32px;
`;

const StyledKeyPadView = styled.View`
  flex-basis: 60%;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const StyledKeyPadRow = styled.View`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CalculatorButton: FC<{
  title: string;
  isControl?: boolean;
  isOperator?: boolean;
}> = ({ title, isControl, isOperator }) => {
  const color = isControl ? "lightgrey" : isOperator ? "orange" : "dimgrey";
  return (
    <StyledButton onPress={() => {}} color={color}>
      <StyledButtonText>{title}</StyledButtonText>
    </StyledButton>
  );
};

const KeyPad: FC = () => {
  return (
    <StyledKeyPadView>
      <StyledKeyPadRow>
        <CalculatorButton title={"C"} isControl />
        <CalculatorButton title={"±"} isControl />
        <CalculatorButton title={"%"} isControl />
        <CalculatorButton title={"÷"} isOperator />
      </StyledKeyPadRow>
      <StyledKeyPadRow>
        <CalculatorButton title={"7"} />
        <CalculatorButton title={"8"} />
        <CalculatorButton title={"9"} />
        <CalculatorButton title={"x"} isOperator />
      </StyledKeyPadRow>
      <StyledKeyPadRow>
        <CalculatorButton title={"4"} />
        <CalculatorButton title={"5"} />
        <CalculatorButton title={"6"} />
        <CalculatorButton title={"-"} isOperator />
      </StyledKeyPadRow>
      <StyledKeyPadRow>
        <CalculatorButton title={"1"} />
        <CalculatorButton title={"2"} />
        <CalculatorButton title={"3"} />
        <CalculatorButton title={"+"} isOperator />
      </StyledKeyPadRow>
      <StyledKeyPadRow>
        <CalculatorButton title={"0"} />
        <CalculatorButton title={"C"} />
        <CalculatorButton title={"."} />
        <CalculatorButton title={"="} isOperator />
      </StyledKeyPadRow>
    </StyledKeyPadView>
  );
};

const StyledNumberView = styled.View`
  justify-content: flex-end;
  flex-basis: 40%;
  width: 100%;
  align-items: flex-end;
`;

const StyledNumberText = styled.Text`
  text-align: right;
  color: white;
  font-size: 60px;
  padding: 0 15px;
`;

export default function App() {
  return (
    <StyledView>
      <StyledNumberView>
        <StyledNumberText>0</StyledNumberText>
      </StyledNumberView>
      <KeyPad />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
const bstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
