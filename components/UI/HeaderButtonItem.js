import React from "react";
import { StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const HeaderButtonItem = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      IconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default HeaderButtonItem;

const styles = StyleSheet.create({});
