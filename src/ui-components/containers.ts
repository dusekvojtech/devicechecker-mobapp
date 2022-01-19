import s from "styled-components/native";
import { View, ScrollView } from "react-native";

const Row = s(View)`
  flex-direction: row;
`;

const ButtonTextWrapper = s(View)`
  width: 90%;
  alignItems: center;
`;

const ScrollViewWrapper = s(ScrollView)`
  width: 100%;
`;

export { Row, ButtonTextWrapper, ScrollViewWrapper };
