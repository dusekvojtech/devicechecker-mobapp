import s from "styled-components/native";
import { View } from "react-native";

const Row = s(View)`
  flex-direction: row;
`;

const ButtonTextWrapper = s(View)`
  width: 90%;
  alignItems: center;
`;

export { Row, ButtonTextWrapper };
