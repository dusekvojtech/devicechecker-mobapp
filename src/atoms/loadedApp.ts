import { atom } from "recoil";

const loadedApp = atom<boolean>({
  key: "loadedApp",
  default: false,
});

export default loadedApp;
