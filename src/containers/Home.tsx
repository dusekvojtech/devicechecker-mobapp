import React, { FC } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";

import userAtom from "atoms/user";
import LoadingComponent from "ui-components/Loading";

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userAtom);

  return <View />;
};

export default HomeScreen;
