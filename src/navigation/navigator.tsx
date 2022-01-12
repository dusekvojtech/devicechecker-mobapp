import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import loadedAtom from "atoms/loadedApp";
import { useRecoilState } from "recoil";
import SignIn from "../containers/Login";
// import CreateAccount from "../screens/CreateAccount";
// import ProductSearch from "../screens/ProductSearch";
// import ProductInfo from "../screens/ProductInfo";
import Home from "../containers/Home";
import Profile from "../containers/Tutorial";
// import Details from "../screens/Details";

const RootStack = createStackNavigator();

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProductStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
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
    <HomeStack.Screen name="Home" component={Home} />
    {/* <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
      })}
    /> */}
  </HomeStack.Navigator>
);

// const ProductStackScreen = () => (
//   <ProductStack.Navigator>
//     <ProductStack.Screen name="Product Search" component={ProductSearch} />
//     <ProductStack.Screen name="ProductInfo" component={ProductInfo} />
//   </ProductStack.Navigator>
// );

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
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
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => {
  const activeColor = useTheme().colors.primaryText;
  const passiveColor = useTheme().colors.passive;

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
              size={30}
              color={focusedIcon(tabInfo.focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome
              name="user-circle"
              size={30}
              color={focusedIcon(tabInfo.focused)}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export const RootStackScreen = ({ login }: { login: boolean }) => (
  <RootStack.Navigator headerMode="none">
    {login ? (
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
  const [loaded] = useRecoilState(loadedAtom);
  return <RootStackScreen login={loaded} />;
};

export default RootNavigator;
