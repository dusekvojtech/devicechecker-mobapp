import React, { FC } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import s from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

const LoadingContainer = s(View)<{ height: number; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  backgroundColor: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  zIndex: 1;
`;

interface Props {
  visible: boolean;
  backgroundColor: string;
}

const LoadingComponent: FC<Props> = (props: Props) => {
  const { colors } = useTheme();
  return props.visible ? (
    <LoadingContainer height={windowHeight} color={props.backgroundColor}>
      <ActivityIndicator size="large" color={colors.primary} />
    </LoadingContainer>
  ) : null;
};

export default LoadingComponent;
