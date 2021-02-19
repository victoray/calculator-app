import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

enum Operator {
  ADD = "+",
  SUBTRACT = "-",
  DIVIDE = "÷",
  MULTIPLY = "x",
  EQUAL = "=",
}
enum Control {
  CLEAR = "C",
  ABS = "±",
  PERCENTAGE = "%",
  DOT = ".",
}

const StyledView = styled.View`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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

type KeyPadProps = {
  handleNumberClick(value: number): void;
  handleControlClick(value: Control): void;
  handleOperatorClick(operator: Operator): void;
};

const KeyPad: FC<KeyPadProps> = ({
  handleControlClick,
  handleNumberClick,
  handleOperatorClick,
}) => {
  return (
    <StyledKeyPadView>
      <StyledKeyPadRow>
        <CalculatorButton
          title={Control.CLEAR}
          onPress={() => handleControlClick(Control.CLEAR)}
          isControl
        />
        <CalculatorButton
          title={Control.ABS}
          onPress={() => handleControlClick(Control.ABS)}
          isControl
        />
        <CalculatorButton
          title={Control.PERCENTAGE}
          onPress={() => handleControlClick(Control.PERCENTAGE)}
          isControl
        />
        <CalculatorButton
          title={Operator.DIVIDE}
          onPress={() => handleOperatorClick(Operator.DIVIDE)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        <CalculatorButton title={"7"} onPress={() => handleNumberClick(7)} />
        <CalculatorButton title={"8"} onPress={() => handleNumberClick(8)} />
        <CalculatorButton title={"9"} onPress={() => handleNumberClick(9)} />
        <CalculatorButton
          title={Operator.MULTIPLY}
          onPress={() => handleOperatorClick(Operator.MULTIPLY)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        <CalculatorButton title={"4"} onPress={() => handleNumberClick(4)} />
        <CalculatorButton title={"5"} onPress={() => handleNumberClick(5)} />
        <CalculatorButton title={"6"} onPress={() => handleNumberClick(6)} />
        <CalculatorButton
          title={Operator.SUBTRACT}
          onPress={() => handleOperatorClick(Operator.SUBTRACT)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        <CalculatorButton title={"1"} onPress={() => handleNumberClick(1)} />
        <CalculatorButton title={"2"} onPress={() => handleNumberClick(2)} />
        <CalculatorButton title={"3"} onPress={() => handleNumberClick(3)} />

        <CalculatorButton
          title={Operator.ADD}
          onPress={() => handleOperatorClick(Operator.ADD)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        <CalculatorButton
          title={"0"}
          onPress={() => handleNumberClick(0)}
          flex
        />
        <CalculatorButton
          title={Control.DOT}
          onPress={() => handleControlClick(Control.DOT)}
        />
        <CalculatorButton
          title={Operator.EQUAL}
          onPress={() => handleOperatorClick(Operator.EQUAL)}
          isOperator
        />
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
  const [number, setNumber] = useState(0);

  const handleNumberClick = (value: number) => {
    setNumber(value);
  };
  const handleControlClick = (value: Control) => {};

  const handleOperatorClick = (operator: Operator) => {};
  return (
    <StyledView>
      <StyledNumberView>
        <StyledNumberText>{number}</StyledNumberText>
      </StyledNumberView>

      <KeyPad
        handleControlClick={handleControlClick}
        handleNumberClick={handleNumberClick}
        handleOperatorClick={handleOperatorClick}
      />
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
