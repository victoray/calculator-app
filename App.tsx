import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components/native";

enum Operator {
  ADD = "+",
  SUBTRACT = "-",
  DIVIDE = "/",
  MULTIPLY = "*",
  POWER = "^",
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

const MAX_DIGIT = 10;

export default function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState<null | number>(null);
  const [operator, setOperator] = useState<Operator | null>(null);

  const [number, setNumber] = useState<string>("0");

  const getNumberValue = (value: number): string => {
    if (number.length === MAX_DIGIT) {
      return number;
    }

    if (number === "0") {
      return String(value);
    }

    return number + value;
  };

  const handleNumberClick = (value: number) => {
    if (number === "0" && value === 0) {
      return;
    }

    const numberValue = getNumberValue(value);

    if (operator && !secondNumber) {
      setSecondNumber(value);
      setNumber(String(value));
    } else {
      setNumber(numberValue);
    }
  };

  const handleControlClick = (value: Control) => {
    switch (value) {
      case Control.ABS:
        setNumber((Number(number) * -1).toString());
        break;
      case Control.DOT:
        if (!number.includes(Control.DOT)) {
          setNumber(number + Control.DOT);
        }
        break;
      case Control.CLEAR:
        ReactDOM.unstable_batchedUpdates(() => {
          setNumber("0");
          setOperator(null);
          setSecondNumber(null);
          setFirstNumber(0);
        });
    }
  };

  const handleOperatorClick = (value: Operator) => {
    switch (value) {
      case Operator.EQUAL:
        if (secondNumber && operator) {
          let result: number;

          if (operator === Operator.POWER) {
            result = Math.pow(firstNumber, Number(number));
          } else {
            result = eval(`${firstNumber} ${operator} ${number}`);
          }

          setNumber(String(result));
        }

        setSecondNumber(null);
        break;
      default:
        setOperator(value);
        setFirstNumber(Number(number));
        setSecondNumber(null);
    }
  };
  return (
    <StyledView>
      <StyledNumberView>
        <StyledNumberText>{number.slice(0, 10)}</StyledNumberText>
      </StyledNumberView>

      <KeyPad
        handleControlClick={handleControlClick}
        handleNumberClick={handleNumberClick}
        handleOperatorClick={handleOperatorClick}
      />
    </StyledView>
  );
}
