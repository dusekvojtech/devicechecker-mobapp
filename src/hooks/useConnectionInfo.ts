import { useEffect, RefObject } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import i18n from "i18n-js";
import DropdownAlert from "react-native-dropdownalert";

const useConnectionInfo = (dropdownAlertRef: RefObject<DropdownAlert>) => {
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isInternetReachable === false) {
      dropdownAlertRef.current?.alertWithType(
        "error",
        i18n.t("general.noInternetHeader"),
        i18n.t("general.noInternetMessage")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo.isInternetReachable]);
};

export default useConnectionInfo;
