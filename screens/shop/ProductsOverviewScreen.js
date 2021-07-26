import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const ProductsOverviewScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All Products",
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

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            // das onSelect kommt aus ProductItem und wird dort bei onPress ausgeführt
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
