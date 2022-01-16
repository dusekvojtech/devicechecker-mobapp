import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { getUser } from "../services/rest";
import userAtom from "../atoms/user";
import loadedAppAtom from "../atoms/loadedApp";

const useAuthUser = () => {
  const [, setUser] = useRecoilState(userAtom);
  const [, setLoadedApp] = useRecoilState(loadedAppAtom);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setUser(user);
      setLoadedApp(true);
    };
    void checkUser();
  }, [setLoadedApp, setUser]);
};

export default useAuthUser;
