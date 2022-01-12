import React, { useState, useRef } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import DropdownAlert from "react-native-dropdownalert";
import { RecoilRoot } from "recoil";

import useI18n from "hooks/useI18n";
import useConnectionInfo from "hooks/useConnectionInfo";

import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import RootNavigator from "navigation/navigator";
import customFonts from "constants/fonts";
import { DarkTheme, DefaultTheme } from "constants/themes";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const scheme = useColorScheme();
  const dropdownAlertRef = useRef<DropdownAlert>(null);

  useI18n();
  useConnectionInfo(dropdownAlertRef);

  const loadResourcesAsync = async () => {
    await Font.loadAsync(customFonts);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <AppearanceProvider>
      <RecoilRoot>
        <NavigationContainer
          theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar barStyle="light-content" />
          <RootNavigator />
          <DropdownAlert
            defaultContainer={{
              padding: 8,
              paddingTop: StatusBar.currentHeight,
              flexDirection: "row",
            }}
            ref={dropdownAlertRef}
          />
        </NavigationContainer>
      </RecoilRoot>
    </AppearanceProvider>
  );
}
