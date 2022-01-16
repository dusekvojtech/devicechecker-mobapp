/* eslint-disable import/prefer-default-export */
import s from "styled-components/native";

const Button = s.TouchableOpacity<{
  background: string;
  justifyContent: string;
  borderRadius: number;
}>`
  flex-Direction: row;
  padding: 15px;
  margin-vertical: 4px;
  background: ${(props) => props.background}
  border-radius: ${(props) => props.borderRadius}px;
  align-items: center;
  justify-content: ${(props) => props.justifyContent}
  margin-vertical: 10px;
  `;

const TextButton = s.TouchableOpacity<{
  paddingTop: number;
  paddingBottom: number;
}>`
  flex-Direction: row;
  padding-top: ${(props) => props.paddingTop}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  align-self: center;
`;

export { Button, TextButton };
