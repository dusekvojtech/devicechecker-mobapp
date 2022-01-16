import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorageValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(e);
  }
};

export const getStorageValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const removeStorageValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
};
