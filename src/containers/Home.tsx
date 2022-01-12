import React, { FC, useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";

import loadedAtom from "atoms/loadedApp";

import LoadingComponent from "ui-components/Loading";

const Home: FC = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [, setLoaded] = useRecoilState(loadedAtom);

  return (
    <View>
      <Text style={{ color: "black" }}>Home</Text>
      <Button title="Login" onPress={() => setLoaded(false)} />
      <Button title="Tutorial" onPress={() => navigation.navigate("Weight")} />
    </View>
  );
};

export default Home;
