import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Products",
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
            navigation.navigate("Edit", {
              productId: "None",
            });
          }}
        >
          <Ionicons
            name="add-outline"
            size={24}
            color={Platform.OS === "android" ? "white" : Colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  });

  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  // wenn man auf delete klickt, soll ein fenster ausploppen, dass einen fragt
  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      // bei nein passiert nichts, bei ja wird es gelöscht  
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            navigation.navigate("Edit", {
              productId: itemData.item.id,
            });
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              navigation.navigate("Edit", {
                productId: itemData.item.id,
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
