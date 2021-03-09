import React, { FC } from "react";
import styled from "styled-components/native";
import CalculatorButton from "./CalculatorButton";

export enum Operator {
  ADD = "+",
  SUBTRACT = "-",
  DIVIDE = "/",
  MULTIPLY = "*",
  POWER = "^",
  EQUAL = "=",
}
export enum Control {
  CLEAR = "C",
  ABS = "±",
  PERCENTAGE = "%",
  DOT = ".",
}

const StyledKeyPadView = styled.View`
  flex-basis: 60%;
  width: 100%;
  padding: 10px;
  margin-bottom: 35px;
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
          title={Operator.POWER}
          onPress={() => handleOperatorClick(Operator.POWER)}
          isOperator
        />
        <CalculatorButton
          title={"÷"}
          onPress={() => handleOperatorClick(Operator.DIVIDE)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        {[7, 8, 9].map((number) => (
          <CalculatorButton
            key={number}
            title={number}
            onPress={() => handleNumberClick(number)}
          />
        ))}
        <CalculatorButton
          title={"x"}
          onPress={() => handleOperatorClick(Operator.MULTIPLY)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        {[4, 5, 6].map((number) => (
          <CalculatorButton
            key={number}
            title={number}
            onPress={() => handleNumberClick(number)}
          />
        ))}
        <CalculatorButton
          title={Operator.SUBTRACT}
          onPress={() => handleOperatorClick(Operator.SUBTRACT)}
          isOperator
        />
      </StyledKeyPadRow>

      <StyledKeyPadRow>
        {[1, 2, 3].map((number) => (
          <CalculatorButton
            key={number}
            title={number}
            onPress={() => handleNumberClick(number)}
          />
        ))}
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

export default KeyPad;
