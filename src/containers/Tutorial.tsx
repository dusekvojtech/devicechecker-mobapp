import React, { FC, useState } from "react";
import s from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import TUTORIAL_1 from "../../assets/backgrounds/tutorial-demo.png";

const TutorialScreen: FC = () => {
  const [tutorialActiveIndex, setTutorialActiveIndex] = useState<number>();
  const navigation = useNavigation();

  return <></>;
};

export default TutorialScreen;
