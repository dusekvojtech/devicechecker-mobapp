import { useEffect } from "react";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

import translationEN from "locales/en.json";
import translationCS from "locales/cs.json";

const useI18n = () => {
  useEffect(() => {
    const manageLanguage = () => {
      i18n.locale = Localization.locale;
      i18n.fallbacks = true;
      i18n.defaultLocale = "en";
      i18n.translations = {
        en: translationEN,
        cs: translationCS,
      };
    };
    void manageLanguage();
  }, []);
};

export default useI18n;
