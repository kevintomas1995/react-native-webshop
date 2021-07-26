import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProducScreen = ({ navigation, route }) => {
  // Falls man auf edit geht, sollen die Felder schon mal ausgefüllt sein mit den schon gegebenen Angaben
  const dispatch = useDispatch();
  const prodId = route.params.productId;
  let editedProduct;

  // prodId !== "None", wenn man auf Add geklickt hat
  if (prodId !== "None") {
    editedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === prodId)
    );
  }
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    // das, wenn man auf edit geklickt hat (deshalb der if check)
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      // das plus vor dem price macht man, damit es KEIN string mehr ist (deswegen kommt sonst ne Fehlermeldung)
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      );
    }
    // Wenn man auf den Pfeil nach editing klickt, soll er zurückspringen
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const submitFn = route.params.submit;



  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.productId === "None" ? "Add" : "Edit",
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
          <Ionicons
            name="checkmark"
            size={24}
            color={Platform.OS === "android" ? "white" : Colors.primary}
            onPress={submitFn}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {/* man soll der Price nur editen können, wenn es ein neues Produkt ist, ansonsten nicht */}
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProducScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
