import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calculator from "./screens/Calculator";
import Converter from "./screens/Converter";
import CalculatorHistoryView from "./screens/CalculatorHistory";
import { Provider } from "react-redux";
import store from "./store";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={"Calculator"}
          tabBarOptions={{
            activeTintColor: "orange",
            inactiveTintColor: "white",
            style: { backgroundColor: "#121212", borderTopColor: "#121212" },
            labelStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        >
          <Tab.Screen name="Calculator" component={Calculator} />
          <Tab.Screen name="Converter" component={Converter} />
          <Tab.Screen name="History" component={CalculatorHistoryView} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MyStack;
