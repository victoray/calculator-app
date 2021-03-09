import React, { FC, useState } from "react";
import KeyPad, { Control, Operator } from "../components/KeyPad";
import ReactDOM from "react-dom";
import styled from "styled-components/native";
import { StyledView } from "../common/styles";
import { saveHistory, useAppDispatch } from "../store";
import dayjs from "dayjs";

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

const Calculator: FC = () => {
  const dispatch = useAppDispatch();

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

  const evaluate = (valueA: number, valueB: number, operator: Operator) => {
    let result: number;
    let equation: string;

    if (operator === Operator.POWER) {
      result = Math.pow(firstNumber, Number(number));
      equation = `${firstNumber} ^ ${number} = ${result}`;
    } else {
      result = eval(`${firstNumber}
      ${operator}
      ${number}`);
      equation = `${firstNumber} ${operator} ${number} = ${result}`;
    }

    dispatch(
      saveHistory({
        equation,
        timestamp: dayjs().format("MMMM DD, YYYY HH:mm"),
      })
    );
    setNumber(String(result));
  };

  const handleOperatorClick = (value: Operator) => {
    switch (value) {
      case Operator.EQUAL:
        if (secondNumber && operator) {
          evaluate(firstNumber, Number(number), operator);
        }
        break;
      default:
        setOperator(value);
        setFirstNumber(Number(number));
    }

    setSecondNumber(null);
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
};

export default Calculator;
