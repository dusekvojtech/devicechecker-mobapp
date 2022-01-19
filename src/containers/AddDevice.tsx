import React, { FC, useRef, useState } from "react";
import i18n from "i18n-js";
import { TextInput, Keyboard } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { radiusSizes } from "constants/sizes";

import LoadingComponent from "ui-components/Loading";
import Container from "ui-components/Container";
import FormContainer from "ui-components/FormContainer";
import { ButtonTextWrapper, ScrollViewWrapper } from "ui-components/containers";
import { ButtonText } from "ui-components/texts";
import { FormTextInput, ErrorMessage } from "ui-components/inputs";
import { Button } from "ui-components/buttons";
import { shadowsStyles } from "ui-components/shadows";
import { createDevice } from "../services/rest";

const AddDeviceScreen: FC = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const identifierRef = useRef<TextInput>(null);
  const [identifier, setIdentifier] = useState({ value: "", error: "" });

  const modelRef = useRef<TextInput>(null);
  const [model, setModel] = useState({ value: "", error: "" });

  const osVersionRef = useRef<TextInput>(null);
  const [osVersion, setOsVersion] = useState({ value: "", error: "" });

  const imageUrlRef = useRef<TextInput>(null);
  const [imageUrl, setImageUrl] = useState({ value: "", error: "" });

  const [vendor, setVendor] = useState({ value: "", error: "" });
  const [os, setOs] = useState({ value: "", error: "" });

  const setInitValues = () => {
    setIdentifier((state) => ({ ...state, error: "" }));
    setModel((state) => ({ ...state, error: "" }));
    setOsVersion((state) => ({ ...state, error: "" }));
    setImageUrl((state) => ({ ...state, error: "" }));
    setVendor((state) => ({ ...state, error: "" }));
    setOs((state) => ({ ...state, error: "" }));
  };

  const signIn = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setInitValues();

    if (identifier.value === "") {
      setIdentifier((state) => ({
        ...state,
        error: i18n.t("general.emptyField"),
      }));
      identifierRef.current?.focus();
      setLoading(false);
      return null;
    }

    if (model.value === "") {
      setModel((state) => ({ ...state, error: i18n.t("general.emptyField") }));
      modelRef.current?.focus();
      setLoading(false);
      return null;
    }

    if (osVersion.value === "") {
      setOsVersion((state) => ({
        ...state,
        error: i18n.t("general.emptyField"),
      }));
      osVersionRef.current?.focus();
      setLoading(false);
      return null;
    }

    if (vendor.value === "") {
      setVendor((state) => ({ ...state, error: i18n.t("general.emptyField") }));
      setLoading(false);
      return null;
    }

    if (os.value === "") {
      setOs((state) => ({ ...state, error: i18n.t("general.emptyField") }));
      setLoading(false);
      return null;
    }

    try {
      const deviceData = await createDevice(
        identifier.value,
        os.value,
        vendor.value,
        model.value,
        osVersion.value,
        imageUrl.value === "" ? undefined : imageUrl.value
      );
      if (deviceData.id) {
        setInitValues();
      }
    } catch (e) {
      setImageUrl((state) => ({ ...state, error: e as string }));
    }
    setLoading(false);
    return null;
  };

  return (
    <Container backgroundColor={colors.background}>
      <LoadingComponent
        visible={loading}
        backgroundColor={colors.transparentBackground}
      />
      <ScrollViewWrapper>
        <FormContainer>
          <FormTextInput
            ref={identifierRef}
            value={identifier.value}
            onChange={(text) =>
              setIdentifier((state) => ({ ...state, value: text }))
            }
            label={i18n.t("addDevice.identifier")}
            secureTextEntry={false}
            error={identifier.error}
            returnKeyType="next"
            onSubmitEditing={() => modelRef.current?.focus()}
          />
          <FormTextInput
            ref={modelRef}
            value={model.value}
            onChange={(text) =>
              setModel((state) => ({ ...state, value: text }))
            }
            label={i18n.t("addDevice.model")}
            secureTextEntry={false}
            error={model.error}
            returnKeyType="next"
            onSubmitEditing={() => osVersionRef.current?.focus()}
          />
          <FormTextInput
            ref={osVersionRef}
            value={osVersion.value}
            onChange={(text) =>
              setOsVersion((state) => ({ ...state, value: text }))
            }
            label={i18n.t("addDevice.osVersion")}
            secureTextEntry={false}
            error={osVersion.error}
            returnKeyType="next"
            onSubmitEditing={() => imageUrlRef.current?.focus()}
          />
          <></>
          <Picker
            selectedValue={os.value}
            onValueChange={(itemValue) =>
              setOs((state) => ({ ...state, value: itemValue }))
            }
            itemStyle={{ color: colors.primaryText }}
          >
            <Picker.Item label={i18n.t("addDevice.osSelect")} value="" />
            <Picker.Item label="iOS" value="IOS" />
            <Picker.Item label="Android" value="ANDROID" />
            <Picker.Item label="Windows" value="WINDOWS" />
          </Picker>
          <ErrorMessage display={!!os.error} color={colors.primary}>
            {os.error}
          </ErrorMessage>
          <></>
          <>
            <Picker
              selectedValue={vendor.value}
              onValueChange={(itemValue) =>
                setVendor((state) => ({ ...state, value: itemValue }))
              }
              itemStyle={{ color: colors.primaryText }}
            >
              <Picker.Item label={i18n.t("addDevice.vendorSelect")} value="" />
              <Picker.Item label="Apple" value="APPLE" />
              <Picker.Item label="Samsung" value="SAMSUNG" />
              <Picker.Item label="Huawei" value="HUAWEI" />
            </Picker>
            <ErrorMessage display={!!vendor.error} color={colors.primary}>
              {vendor.error}
            </ErrorMessage>
          </>
          <FormTextInput
            ref={imageUrlRef}
            value={imageUrl.value}
            onChange={(text) =>
              setImageUrl((state) => ({ ...state, value: text }))
            }
            label={i18n.t("addDevice.imageUrl")}
            secureTextEntry={false}
            error={imageUrl.error}
            returnKeyType="next"
            onSubmitEditing={() => null}
          />
          <Button
            onPress={() => signIn()}
            background={colors.primary}
            justifyContent="center"
            borderRadius={radiusSizes.smallRadius}
            style={shadowsStyles.shadowContainer}
          >
            <ButtonTextWrapper>
              <ButtonText color={colors.text} font="roboto-bold">
                {i18n.t("addDevice.create")}
              </ButtonText>
            </ButtonTextWrapper>
          </Button>
        </FormContainer>
      </ScrollViewWrapper>
    </Container>
  );
};

export default AddDeviceScreen;
