import "@react-navigation/native";

// Override the theme in react native navigation to accept our custom theme props.
declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      primaryText: string;
      secondaryText: string;
      text: string;
      border: string;
      passive: string;
      transparentBackground: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
