import React from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";
import { useRecoilState } from "recoil";
import s from "styled-components/native";
import i18n from "i18n-js";
import { useTheme } from "@react-navigation/native";

import { ButtonText } from "ui-components/texts";
import { ButtonTextWrapper, Row } from "ui-components/containers";
import { fontSizes, radiusSizes } from "constants/sizes";
import { shadowsStyles } from "ui-components/shadows";
import { Button } from "ui-components/buttons";
import userAtom from "../atoms/user";
import { Device } from "../services/rest";

import noImage from "../../assets/no-image.png";

const Wrapper = s(View)`
  margin: 20px;
  align-items: center;
`;

const ItemImage = s(Image)`
  flex: 1;
  height: 150px;
  resize-mode: contain;
`;

const Content = s(View)`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const Description = s(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-family: "roboto";
  font-size: ${fontSizes.middleSize}px;
  line-height: 22px;
  width: 70%;
  margin-vertical: 5px;
  margin-left: 20px;
  text-align: left;
`;

export type Props = {
  device: Device;
  bookAction: () => void;
  returnAction: () => void;
};

const DeviceItem = (props: Props) => {
  const [user] = useRecoilState(userAtom);
  const { colors } = useTheme();

  const getDeviceDetail = (): {
    title: string;
    color: string;
    action: () => void;
    disabled: boolean;
  } => {
    const id = props.device.borrowed?.user.id;
    if (id) {
      if (id === user?.id) {
        return {
          title: i18n.t("home.return"),
          color: colors.secondary,
          action: props.returnAction,
          disabled: false,
        };
      }
      return {
        title: i18n.t("home.booked"),
        color: colors.passive,
        action: () => null,
        disabled: true,
      };
    }
    return {
      title: i18n.t("home.book"),
      color: colors.primary,
      action: props.bookAction,
      disabled: false,
    };
  };

  return (
    <Wrapper>
      <Row>
        <ItemImage
          source={props.device.image ? { uri: props.device.image } : noImage}
        />
        <Content>
          <Description color={colors.primaryText}>
            {props.device.model}
          </Description>
          <Description color={colors.primaryText}>
            {props.device.vendor}
          </Description>
          <Description color={colors.primaryText}>
            {`${props.device.os} ${props.device.osVersion ?? ""}`}
          </Description>
        </Content>
      </Row>
      <Row>
        <Content>
          <Description color={colors.primaryText}>
            {`${props.device.borrowed?.user.name ?? ""} ${
              props.device.borrowed
                ? moment(props.device.borrowed?.date).format("D.M.Y")
                : ""
            }`}
          </Description>
        </Content>
        <Button
          disabled={getDeviceDetail().disabled}
          onPress={() => {
            getDeviceDetail().action();
          }}
          background={getDeviceDetail().color}
          justifyContent="center"
          borderRadius={radiusSizes.smallRadius}
          style={(shadowsStyles.shadowContainer, { flex: 1 })}
        >
          <ButtonTextWrapper>
            <ButtonText color={colors.text} font="roboto-bold">
              {getDeviceDetail().title}
            </ButtonText>
          </ButtonTextWrapper>
        </Button>
      </Row>
    </Wrapper>
  );
};

export default DeviceItem;
