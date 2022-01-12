import React, { ReactNode } from "react";
import ViewPropTypes from "react-native";
import s from "styled-components/native";

const ContainerView = s.SafeAreaView<{ backgroundColor: string }>`
  alignItems: center;
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
`;

interface Props {
  style?: ViewPropTypes.ViewProps;
  children?: ReactNode;
  backgroundColor: string;
}

const Container = (props: Props) => (
  <ContainerView {...props} style={props.style} />
);

export default Container;
