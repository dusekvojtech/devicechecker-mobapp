import React, { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  children?: ReactNode;
  extraHeight?: number;
}

const Container = (props: Props) => (
  <KeyboardAwareScrollView
    enableOnAndroid
    extraHeight={props.extraHeight}
    style={{ width: "100%" }}
    contentContainerStyle={{
      width: "80%",
      alignSelf: "center",
      justifyContent: "flex-end",
      height: "100%",
      paddingBottom: 20,
    }}
    {...props}
  />
);

export default Container;
