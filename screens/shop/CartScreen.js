import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  // hier wandeln wir die vorhanden Produkte im Warenkorb in ein Array um, um damit leichter mit Flatlist arbeiten zu können
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>€ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order now!"
          disabled={cartItems.length == 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemdata) => (
          <CartItem
            quantity={itemdata.item.quantity}
            title={itemdata.item.productTitle}
            amount={itemdata.item.sum}
            onRemove={() => {}}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    textShadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
