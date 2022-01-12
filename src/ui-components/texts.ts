import s from "styled-components/native";

const ButtonText = s.Text<{ color: string; font: string }>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: 15px;
`;

const ErrorMessage = s.Text`
  width: 90%;
  font-size: 12px;
  color: #E91916;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const Heading = s.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-family: "roboto-bold";
  font-size: 33px;
  line-height: 38px;
  align-self: center;
  text-align: center;
  padding-bottom: 20px;
`;

const Description = s.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-family: "roboto";
  font-size: 14px;
  line-height: 22px;
  width: 70%;
  align-self: center;
  padding-bottom: 20px;
  text-align: center;
`;

const TextLabel = s.Text<{ color: string; fontSize: number }>`
  color: ${(props) => props.color};
  font-family: "roboto";
  font-size: ${(props) => props.fontSize}px;
  padding-left: 8px;
`;

export { ButtonText, ErrorMessage, Heading, Description, TextLabel };
