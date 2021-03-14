import React, { FC } from "react";
import { CalculatorHistory } from "../store";
import { StyledView } from "../common/styles";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";

const StyledTitle = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

const StyledText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;
  color: white;
`;

const StyledContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 15px 15px 0;
  margin-top: 25px;
  align-items: center;
`;

const StyledHistoryItem = styled.View`
  margin: 10px;
  background-color: #262626;
  padding: 8px;
`;

const styles = StyleSheet.create({
  flatList: {
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
});

const HistoryList: FC<{
  calculatorHistory: CalculatorHistory[];
  title?: string;
}> = ({ calculatorHistory, title = "History" }) => {
  return (
    <StyledView>
      <StyledContainer>
        <StyledTitle>{title}</StyledTitle>

        <FlatList
          style={styles.flatList}
          keyExtractor={(_, index) => String(index)}
          data={calculatorHistory}
          renderItem={({ item, index }) => (
            <StyledHistoryItem key={index}>
              <StyledText>Equation: {item.equation}</StyledText>
              <StyledText>Date: {item.timestamp}</StyledText>
            </StyledHistoryItem>
          )}
        />
      </StyledContainer>
    </StyledView>
  );
};

export default HistoryList;
