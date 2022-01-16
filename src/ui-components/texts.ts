import s from "styled-components/native";
import { Text } from "react-native";
import { fontSizes } from "constants/sizes";

const ButtonText = s(Text)<{ color: string; font: string }>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${fontSizes.middleSize}px;
`;

const Heading = s(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-family: "roboto-bold";
  font-size: ${fontSizes.largeSize}px;
  line-height: 38px;
  align-self: center;
  text-align: center;
  padding-bottom: 20px;
`;

const Description = s(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-family: "roboto";
  font-size: ${fontSizes.middleSize}px;
  line-height: 22px;
  width: 70%;
  align-self: center;
  padding-bottom: 20px;
  text-align: center;
`;

const TextLabel = s(Text)<{ color: string; fontSize: number }>`
  color: ${(props) => props.color};
  font-family: "roboto";
  font-size: ${(props) => props.fontSize}px;
  padding-left: 8px;
`;

export { ButtonText, Heading, Description, TextLabel };
