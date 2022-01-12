import React, { FC, useRef, useState } from "react";
import { TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@react-navigation/native";
import i18n from "i18n-js";
import s from "styled-components/native";
import { useRecoilState } from "recoil";

import loadedAtom from "atoms/loadedApp";

import { iconSizes, inputSizes, radiusSizes } from "constants/sizes";

import LoadingComponent from "ui-components/Loading";
import Container from "ui-components/Container";
import {
  FormWrapper,
  Row,
  KeyboardView,
  ButtonTextWrapper,
  ContainerScrollView,
} from "ui-components/containers";
import { ButtonText, ErrorMessage, Heading } from "ui-components/texts";
import { Button } from "ui-components/buttons";
import { shadowsStyles } from "ui-components/shadows";
import getEnvVars from "../../environment";

import Logo from "../../assets/icons/logo.svg";

const Login: FC = () => {
  const { DEFAULT_EMAIL, DEFAULT_PASSWORD } = getEnvVars();
  const [loaded, setLoaded] = useRecoilState(loadedAtom);

  const passwordRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");

  const { colors } = useTheme();

  // async function signIn() {
  //   Keyboard.dismiss();
  //   setPasswordError("");
  //   setUsernameError("");
  //   if (username === "") {
  //     setUsernameError(i18n.t("emptyField"));
  //     return null;
  //   }
  //   if (password === "") {
  //     setPasswordError(i18n.t("emptyField"));
  //     return null;
  //   }

  //   // TODO login logic
  // }

  // useEffect(() => {
  //   if (params.showAlert) {
  //     Alert.alert(params.heading, params.message);
  //   }
  // }, [params.heading, params.message, params.showAlert]);

  // const setInitStates = () => {
  //   setUsername("");
  //   setPassword("");
  //   setPasswordError("");
  //   setUsernameError("");
  //   passwordRef.current?.clear();
  //   usernameRef.current?.clear();
  // };

  return (
    <Container backgroundColor={colors.background}>
      <ContainerScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardView behavior="position" justifyContent="center">
            <FormWrapper>
              <Row>
                <Logo
                  height={iconSizes.basicSize}
                  width={iconSizes.basicSize}
                  fill={colors.primary}
                />
                <Heading color={colors.primaryText}>
                  {i18n.t("login.header")}
                </Heading>
              </Row>
              <Button
                onPress={() => setLoaded(true)}
                background={colors.primary}
                justifyContent="center"
                borderRadius={radiusSizes.smallRadius}
                style={shadowsStyles.shadowContainer}
              >
                <ButtonTextWrapper>
                  <ButtonText color={colors.text} font="roboto-bold">
                    {i18n.t("login.buttonTitle")}
                  </ButtonText>
                </ButtonTextWrapper>
              </Button>
            </FormWrapper>
          </KeyboardView>
        </TouchableWithoutFeedback>
      </ContainerScrollView>
    </Container>
  );
};

export default Login;
