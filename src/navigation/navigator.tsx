import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import i18n from "i18n-js";

import { iconSizes } from "constants/sizes";
import { handleLogout } from "services/rest";
import useAuthUser from "hooks/useAuthUser";
import userAtom from "atoms/user";
import ROLE from "constants/roles";
import { useRecoilState } from "recoil";
import SignIn from "../containers/Login";
import Home from "../containers/Home";
import AddDevice from "../containers/AddDevice";
import Profile from "../containers/Profile";

const RootStack = createStackNavigator();

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AddDeviceStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignIn} />
  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: useTheme().colors.secondary,
        elevation: 0,
        shadowColor: "transparent",
      },
      headerTitleStyle: {
        fontFamily: "roboto-bold",
      },
      headerTintColor: useTheme().colors.secondaryText,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: i18n.t("home.header"),
      }}
    />
  </HomeStack.Navigator>
);

const AddDeviceStackScreen = () => (
  <AddDeviceStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: useTheme().colors.secondary,
        elevation: 0,
        shadowColor: "transparent",
      },
      headerTitleStyle: {
        fontFamily: "roboto-bold",
      },
      headerTintColor: useTheme().colors.secondaryText,
    }}
  >
    <AddDeviceStack.Screen
      name="Add Device"
      component={AddDevice}
      options={{
        title: i18n.t("addDevice.header"),
      }}
    />
  </AddDeviceStack.Navigator>
);

const ProfileStackScreen = () => {
  const { colors } = useTheme();
  const [, setUser] = useRecoilState(userAtom);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
          elevation: 0,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "roboto-bold",
        },
        headerTintColor: colors.secondaryText,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: i18n.t("profile.header"),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                setUser(null);
                void handleLogout();
              }}
            >
              <MaterialIcons
                name="logout"
                size={iconSizes.middleSize}
                color={colors.primaryText}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const TabsScreen = () => {
  const activeColor = useTheme().colors.primaryText;
  const passiveColor = useTheme().colors.passive;
  const [user] = useRecoilState(userAtom);

  const focusedIcon = (focus: boolean): string =>
    focus ? activeColor : passiveColor;
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: useTheme().colors.background,
          paddingBottom: 10,
        },
        keyboardHidesTabBar: Platform.OS !== "ios",
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome
              name="home"
              size={iconSizes.basicSize}
              color={focusedIcon(tabInfo.focused)}
            />
          ),
        }}
      />
      {user?.type === ROLE.Admin && (
        <Tabs.Screen
          name="AddDevice"
          component={AddDeviceStackScreen}
          options={{
            tabBarIcon: (tabInfo) => (
              <FontAwesome
                name="plus-square"
                size={iconSizes.basicSize}
                color={focusedIcon(tabInfo.focused)}
              />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome
              name="user-circle"
              size={iconSizes.basicSize}
              color={focusedIcon(tabInfo.focused)}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export const RootStackScreen = ({ logged }: { logged: boolean }) => (
  <RootStack.Navigator headerMode="none">
    {logged ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const RootNavigator = () => {
  const [user] = useRecoilState(userAtom);
  useAuthUser();
  return <RootStackScreen logged={!!user} />;
};

export default RootNavigator;
