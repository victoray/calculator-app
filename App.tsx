import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calculator from "./screens/Calculator";
import Converter from "./screens/Converter";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Calculator"}
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
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="Converter" component={Converter} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
