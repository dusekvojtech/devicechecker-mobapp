declare module "*.png" {
  const content: import("react-native").ImageURISource;

  export default content;
}

declare module "*.otf" {
  const content: import("react-native").FontVariant;

  export default content;
}

declare module "*.svg" {
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}
