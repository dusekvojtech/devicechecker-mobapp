import { atom } from "recoil";
import ROLE from "../constants/roles";

export type User = {
  id: string;
  type: ROLE;
  login: string;
  name: string;
  token: string;
};

const userAtom = atom<User | null>({
  key: "user",
  default: null,
});

export default userAtom;
