import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator, OrdersNavigator, AdminNavigator } from "./MainStackNavigator";
import Colors from "../constants/Colors";

const Drawer = createDrawerNavigator();

const globalScreenOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: { color: Colors.primary },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={globalScreenOptions}>
      <Drawer.Screen name="Products" component={MainStackNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;