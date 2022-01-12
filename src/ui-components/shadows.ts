/* eslint-disable import/prefer-default-export */
import { StyleSheet } from "react-native";

const shadowsStyles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export { shadowsStyles };
