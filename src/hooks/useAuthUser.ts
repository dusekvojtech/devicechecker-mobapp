import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useAuthUser = (screen: string) => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = null; // TODO auth hook
        if (user) {
          navigation.navigate(screen);
        }
      } catch (error) {
        navigation.navigate("Login");
        console.warn(error);
      }
    };
    void checkUser();
  }, [navigation, screen]);
};

export default useAuthUser;
