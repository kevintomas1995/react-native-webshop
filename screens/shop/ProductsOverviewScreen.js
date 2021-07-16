import React, { useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View, FlatList, Platfrom, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const ProductsOverviewScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All Products",
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 20}} onPress={() => {navigation.navigate("Cart")}}>
          <Feather name="shopping-cart" size={20} color={Platform.OS === "android" ? "white" : Colors.primary}/>
        </TouchableOpacity>
      ),
    });
  });

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              navigation.navigate("ProductDetails", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
