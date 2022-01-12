import { atom } from "recoil";
// import { ROLE } from '../routing/roles';

export type User = {
  id: string;
  type: string;
  login: string;
  name: string;
  token: string;
};

const userAtom = atom<User | null>({
  key: "user",
  default: null,
});

export default userAtom;
