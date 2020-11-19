import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationAL from './translations/al.json';
import translationEN from './translations/en.json';

// the translations
const resources = {
  al: {
    translation: translationAL
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;