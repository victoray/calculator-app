import React, { FC, useEffect, useState } from "react";
import { CalculatorHistory } from "../store";
import firestore from "../storage/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import HistoryList from "../components/HistoryList";

const CloudHistory: FC<{ navigation: StackNavigationProp<any> }> = ({
  navigation,
}) => {
  const [calculatorHistory, setCalculatorHistory] = useState<
    CalculatorHistory[]
  >([]);

  useEffect(() => {
    const onFocus = () => {
      firestore.getItem().then((querySnapshot) => {
        const historyObjects: CalculatorHistory[] = [];
        querySnapshot.forEach((doc) => {
          historyObjects.push(doc.data() as CalculatorHistory);
        });

        setCalculatorHistory(historyObjects);
      });
    };

    navigation.addListener("focus", onFocus);

    return () => {
      navigation.removeListener("focus", onFocus);
    };
  }, []);

  return (
    <HistoryList
      calculatorHistory={calculatorHistory}
      title={"Cloud History"}
    />
  );
};

export default CloudHistory;
