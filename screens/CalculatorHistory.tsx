import React from "react";
import { useSelector } from "react-redux";
import { selectCalculatorHistory } from "../store";
import HistoryList from "../components/HistoryList";

const CalculatorHistoryView = () => {
  const calculatorHistory = useSelector(selectCalculatorHistory);

  return <HistoryList calculatorHistory={calculatorHistory} />;
};

export default CalculatorHistoryView;
