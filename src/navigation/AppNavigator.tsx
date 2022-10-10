import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Actions, Portafolio, Prices, Settings, Home, News, screenOptions } from "../screens";
import { TabBar } from "../components";

export type RootStackParamList = {
  HomeScreen: undefined;
  News: undefined;
}

const HomeStackNavigator = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator >
      <HomeStackNavigator.Screen key={0} name="HomeScreen" component={Home} options={screenOptions} />
      <HomeStackNavigator.Screen key={1} name="News" component={News} />
    </HomeStackNavigator.Navigator>
  );
};
const TabBarNavigator = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={(props) => <TabBar {...props} />} >
      <TabBarNavigator.Screen name="Home" component={HomeNavigator} />
      <TabBarNavigator.Screen name="Portfolio" component={Portafolio} />
      <TabBarNavigator.Screen name="Actions" component={Actions} />
      <TabBarNavigator.Screen name="Prices" component={Prices} />
      <TabBarNavigator.Screen name="Settings" component={Settings} />
    </TabBarNavigator.Navigator>
  )
}
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator;