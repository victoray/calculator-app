import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calculator from "./screens/Calculator";
import Converter from "./screens/Converter";
import CalculatorHistoryView from "./screens/CalculatorHistory";
import { Provider } from "react-redux";
import CloudHistory from "./screens/CloudHistory";
import "./firebase";
import store from "./store";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={"Cloud History"}
          tabBarOptions={{
            activeTintColor: "orange",
            inactiveTintColor: "white",
            style: { backgroundColor: "#121212", borderTopColor: "#121212" },
            labelStyle: {
              fontSize: 14,
              fontWeight: "bold",
            },
          }}
        >
          <Tab.Screen name="Calculator" component={Calculator} />
          <Tab.Screen name="Converter" component={Converter} />
          <Tab.Screen name="History" component={CalculatorHistoryView} />
          <Tab.Screen name="Cloud" component={CloudHistory} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MyStack;
