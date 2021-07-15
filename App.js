import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import { createStore, combineReducers } from "redux";
import productsReducer from "./store/reducer/products";
import { Provider } from "react-redux";
import Colors from "./constants/Colors";

const Stack = createStackNavigator();
const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const globalScreenOptions = {
  headerStyle: { backgroundColor: Platform.OS ==="android" ? Colors.primary : ""},
  headerTitleStyle: { color: "white" },
  headerTintColor: Platform.OS ==="android" ? "white": Colors.primary,
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name="ProductsOverview"
            component={ProductsOverviewScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
