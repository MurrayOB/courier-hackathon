import { languages } from "../core/constants/languages";

export const getLanguageNameByCode = (code: string) => {
  const language = languages.find((x) => x.code == code)?.language;
  return language;
};
