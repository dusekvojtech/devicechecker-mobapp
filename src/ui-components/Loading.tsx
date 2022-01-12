import React, { FC } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import s from "styled-components/native";

import appColors from "constants/themes";

const windowHeight = Dimensions.get("window").height;

const LoadingContainer = s.View<{ height: number; opacityColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  backgroundColor: ${(props) => props.opacityColor};
  align-items: center;
  justify-content: center;
  zIndex: 1;
`;

interface Props {
  visible: boolean;
  opacityColor: string;
}

const LoadingComponent: FC<Props> = (props: Props) =>
  props.visible ? (
    <LoadingContainer height={windowHeight} opacityColor={props.opacityColor}>
      <ActivityIndicator size="large" color={"#000000"} />
    </LoadingContainer>
  ) : null;

export default LoadingComponent;
