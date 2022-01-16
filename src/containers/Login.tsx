import React, { FC, useRef, useState } from "react";
import { TextInput, Keyboard } from "react-native";
import { useTheme } from "@react-navigation/native";
import i18n from "i18n-js";
import { useRecoilState } from "recoil";

import userAtom from "atoms/user";
import loadedAppAtom from "atoms/loadedApp";

import { iconSizes, radiusSizes } from "constants/sizes";

import LoadingComponent from "ui-components/Loading";
import Container from "ui-components/Container";
import FormContainer from "ui-components/FormContainer";
import { Row, ButtonTextWrapper } from "ui-components/containers";
import { ButtonText, Heading } from "ui-components/texts";
import { FormTextInput } from "ui-components/inputs";
import { Button } from "ui-components/buttons";
import { shadowsStyles } from "ui-components/shadows";
import { validateEmail } from "../services/text";
import { handleLogin } from "../services/rest";
import getEnvVars from "../../environment";

import Logo from "../../assets/icons/logo.svg";

const Login: FC = () => {
  const { colors } = useTheme();
  const { DEFAULT_EMAIL, DEFAULT_PASSWORD } = getEnvVars();
  const [, setUser] = useRecoilState(userAtom);
  const [loadedApp] = useRecoilState(loadedAppAtom);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<TextInput>(null);
  const [email, setEmail] = useState({ value: DEFAULT_EMAIL, error: "" });

  const passwordRef = useRef<TextInput>(null);
  const [password, setPassword] = useState({
    value: DEFAULT_PASSWORD,
    error: "",
  });

  const signIn = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setPassword((state) => ({ ...state, error: "" }));
    setEmail((state) => ({ ...state, error: "" }));
    if (email.value === "") {
      setEmail((state) => ({ ...state, error: i18n.t("general.emptyField") }));
      emailRef.current?.focus();
      setLoading(false);
      return null;
    }
    const clearEmail = email.value.toLowerCase().trim();
    if (!validateEmail(clearEmail)) {
      setEmail((state) => ({
        ...state,
        error: i18n.t("general.invalidEmail"),
      }));
      emailRef.current?.focus();
      setLoading(false);
      return null;
    }
    if (password.value === "") {
      setPassword((state) => ({
        ...state,
        error: i18n.t("general.emptyField"),
      }));
      setLoading(false);
      return null;
    }

    try {
      const userData = await handleLogin(email.value, password.value);
      if (userData.id) {
        setUser(userData);
      }
    } catch (e) {
      setPassword((state) => ({
        ...state,
        error: e as string,
      }));
    }
    setLoading(false);
    return null;
  };

  return (
    <Container backgroundColor={colors.background}>
      <LoadingComponent
        visible={loading || !loadedApp}
        backgroundColor={
          !loadedApp ? colors.surface : colors.transparentBackground
        }
      />
      <Row style={{ marginTop: 50 }}>
        <Logo
          height={iconSizes.basicSize}
          width={iconSizes.basicSize}
          fill={colors.primary}
        />
        <Heading color={colors.primaryText}>{i18n.t("login.header")}</Heading>
      </Row>
      <FormContainer>
        <FormTextInput
          ref={emailRef}
          value={email.value}
          onChange={(text) => setEmail((state) => ({ ...state, value: text }))}
          label={i18n.t("login.email")}
          secureTextEntry={false}
          keyboardType="email-address"
          error={email.error}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <FormTextInput
          ref={passwordRef}
          value={password.value}
          onChange={(text) =>
            setPassword((state) => ({ ...state, value: text }))
          }
          label={i18n.t("login.password")}
          secureTextEntry
          error={password.error}
          returnKeyType="send"
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
              {i18n.t("login.buttonTitle")}
            </ButtonText>
          </ButtonTextWrapper>
        </Button>
      </FormContainer>
    </Container>
  );
};

export default Login;
