import s from "styled-components/native";

const FormWrapper = s.View`
  width: 90%;
  align-items: center;
  align-self: center;
`;

const Row = s.View`
  flex-direction: row;
`;

const EmptySpace = s.View<{ height: number }>`
  height: ${(props) => props.height}px;
`;

const KeyboardView = s.KeyboardAvoidingView<{ justifyContent?: string }>`
  width: 100%;
  flex: 1;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const ButtonTextWrapper = s.View`
  width: 90%;
  alignItems: center;
`;

const ContainerScrollView = s.ScrollView`
  width: 100%;
  margin-vertical: 20px;
`;

export {
  FormWrapper,
  Row,
  EmptySpace,
  KeyboardView,
  ContainerScrollView,
  ButtonTextWrapper,
};
