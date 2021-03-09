import "react-native-gesture-handler";
import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components/native";
import KeyPad, { Control, Operator } from "./components/KeyPad";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const StyledView = styled.View`
  background-color: #121212;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

type RootStackParamList = {
  Calculator: undefined;
  Converter: undefined;
};

const App: FC<{ navigation: StackNavigationProp<RootStackParamList> }> = ({
  navigation,
}) => {
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

    if (operator === Operator.POWER) {
      result = Math.pow(firstNumber, Number(number));
    } else {
      result = eval(`${firstNumber} ${operator} ${number}`);
    }

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

const StyledInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledTextInput = styled.TextInput`
  text-align: right;
  color: black;
  font-size: 30px;
  padding: 0 15px;
  border: 1px solid black;
  border-radius: 6px;
  background-color: orange;
  flex: 1;
  width: 80%;
  margin: 0 0 10px 10px;
`;
const StyledText = styled.Text`
  font-size: 15px;
  margin-left: 15px;
  color: white;
  flex: 0 0 20%;
`;

const StyledResetContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 15px;
  margin-top: 25px;
  justify-content: center;
`;

const StyledResetButton = styled.TouchableOpacity`
  font-size: 35px;
  color: white;
  background-color: #f5222d;
  padding: 5px;
  border-radius: 5px;
  width: 50%;
`;

const StyledResetButtonText = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const Converter = () => {
  const [[miles, kilometers], setValues] = useState(["0", "0"]);

  const hasDecimal = (value: string) => {
    return value[value.length - 1] === "." && value.match(/\./g)?.length === 1;
  };

  const onMilesChange = (value: string) => {
    if (hasDecimal(value)) {
      setValues([value, (Number(value) * 1.609).toFixed(4)]);
      return;
    }
    const miles_ = parseFloat(value);
    if (!isNaN(miles_)) {
      setValues([String(miles_), (miles_ * 1.609).toFixed(4)]);
    }
  };

  const onKiloMetersChange = (value: string) => {
    if (hasDecimal(value)) {
      setValues([(Number(value) / 1.609).toFixed(4), value]);
      return;
    }
    const km = parseFloat(value);
    if (!isNaN(km)) {
      setValues([(km / 1.609).toFixed(4), String(km)]);
    }
  };
  return (
    <StyledView>
      <StyledInputContainer>
        <StyledTextInput value={String(miles)} onChangeText={onMilesChange} />
        <StyledText>miles</StyledText>
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledTextInput
          value={String(kilometers)}
          onChangeText={onKiloMetersChange}
        />
        <StyledText>km</StyledText>
      </StyledInputContainer>

      <StyledResetContainer>
        <StyledResetButton onPress={() => setValues(["0", "0"])}>
          <StyledResetButtonText>Reset</StyledResetButtonText>
        </StyledResetButton>
      </StyledResetContainer>
    </StyledView>
  );
};

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Converter"}
        tabBarOptions={{
          activeTintColor: "orange",
          inactiveTintColor: "white",
          style: { backgroundColor: "#121212", borderTopColor: "#121212" },
          labelStyle: {
            fontSize: 25,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen name="Calculator" component={App} options={{}} />
        <Tab.Screen name="Converter" component={Converter} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
