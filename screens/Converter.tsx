import React, { useState } from "react";
import styled from "styled-components/native";
import { StyledView } from "../common/styles";
import { Keyboard, Pressable } from "react-native";

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
  const initialValue = ["0", "0"];
  const [[miles, kilometers], setValues] = useState(initialValue);

  const hasDecimal = (value: string) => {
    return value[value.length - 1] === "." && value.match(/\./g)?.length === 1;
  };

  const onMilesChange = (value: string) => {
    if (!value) {
      setValues(initialValue);
    }
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
    if (!value) {
      setValues(initialValue);
    }
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
    <Pressable onPress={Keyboard.dismiss} style={{ flexGrow: 1 }}>
      <StyledView>
        <StyledInputContainer>
          <StyledTextInput
            value={String(miles)}
            onChangeText={onMilesChange}
            keyboardType={"numeric"}
          />
          <StyledText>miles</StyledText>
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledTextInput
            value={String(kilometers)}
            onChangeText={onKiloMetersChange}
            keyboardType={"numeric"}
          />
          <StyledText>km</StyledText>
        </StyledInputContainer>

        <StyledResetContainer>
          <StyledResetButton onPress={() => setValues(initialValue)}>
            <StyledResetButtonText>Reset</StyledResetButtonText>
          </StyledResetButton>
        </StyledResetContainer>
      </StyledView>
    </Pressable>
  );
};

export default Converter;
