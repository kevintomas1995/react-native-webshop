import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Orders",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Feather
            name="menu"
            size={20}
            color={Platform.OS === "android" ? "white" : Colors.primary}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Feather
            name="shopping-cart"
            size={20}
            color={Platform.OS === "android" ? "white" : Colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
