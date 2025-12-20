import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "@/assets/locales/en.json";
import pl from "@/assets/locales/pl.json";

const resources = { en: { translation: en }, pl: { translation: pl } };

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  saveMissing: true,
});

i18n.on("languageChanged", async (lng) => {
  await AsyncStorage.setItem("user-language", lng);
});

export default i18n;
