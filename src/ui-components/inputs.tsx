import React, { useState, Ref, forwardRef } from "react";
import s from "styled-components/native";
import {
  Text,
  TextInput,
  View,
  KeyboardType,
  ReturnKeyType,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { iconSizes, radiusSizes, fontSizes } from "constants/sizes";
import { useTheme } from "@react-navigation/native";

const ErrorMessage = s(Text)<{ display: boolean; color: string }>`
  display: ${(props) => (!props.display ? "none" : "flex")}
  width: 90%;
  font-size: ${fontSizes.smallSize}px;
  color: ${(props) => props.color};
`;

const Input = s(TextInput)<{ color: string }>`
  height: 80%;
  flex: 1;
  font-family: roboto;
  font-size: ${fontSizes.basicSize}px;
  line-height: 20px;
  color: ${(props) => props.color};
`;

const Container = s(View)<{ background: string; borderColor: string }>`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${radiusSizes.smallRadius}px;
  height: 50px;
  padding-horizontal: 10px;
  margin-vertical: 10px;
`;

type Props = {
  value: string;
  label: string;
  onChange: (text: string) => void;
  error?: string;
  secureTextEntry: boolean;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  onSubmitEditing?: () => void;
  ref: Ref<TextInput>;

  textarea?: boolean;
};

const FormTextInput = forwardRef<TextInput, Props>(
  (
    {
      value,
      onChange,
      label,
      error,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
    },
    ref
  ) => {
    const [text, setText] = useState(value);
    const [visibility, setVisibility] = useState(false);

    const { colors } = useTheme();

    const RenderEye = () => {
      if (visibility) {
        return (
          <TouchableOpacity onPress={() => setVisibility(!visibility)}>
            <Ionicons
              name="eye"
              size={iconSizes.smallSize}
              color={colors.primaryText}
              style={{ position: "relative", right: 0 }}
            />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity onPress={() => setVisibility(!visibility)}>
          <Ionicons
            name="eye-off"
            size={iconSizes.smallSize}
            color={colors.primaryText}
            style={{ position: "relative", right: 0 }}
          />
        </TouchableOpacity>
      );
    };

    return (
      <>
        <Container background={colors.surface} borderColor={colors.border}>
          <Input
            color={colors.primaryText}
            onChangeText={(t) => {
              setText(t);
              onChange(t);
            }}
            ref={ref}
            value={text}
            keyboardType={keyboardType ?? "default"}
            returnKeyType={returnKeyType ?? "next"}
            placeholder={label}
            secureTextEntry={!secureTextEntry ? false : !visibility}
            placeholderTextColor={colors.primaryText}
            onSubmitEditing={onSubmitEditing ?? undefined}
            multiline={false}
          />
          {secureTextEntry && <RenderEye />}
        </Container>
        <ErrorMessage display={!!error} color={colors.primary}>
          {error ?? ""}
        </ErrorMessage>
      </>
    );
  }
);

export { FormTextInput, ErrorMessage };
