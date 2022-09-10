import axios from "axios";
import { startOfDay } from "date-fns";
import fs from "firebase-admin";
import { IWordOfTheDay } from "../models/word-of-the-day";

export const fetchWordOfTheDay = () => {};

export const createWordOfTheDay = async () => {
  const englishWord = await fetchRandomEnglishWord();
  const wordDescription = await fetchWordDescription(englishWord);
  const wordOfTheDay: IWordOfTheDay = {
    translation: englishWord,
    description: wordDescription,
    date: startOfDay(new Date()),
  };
  await storeWordOfTheDay(wordOfTheDay);
};

const fetchRandomEnglishWord = async () => {
  const options: any = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    headers: {
      "X-RapidAPI-Key": process.env.rapid_api_key,
      "X-RapidAPI-Host": process.env.rapid_api_host,
    },
  };
  const word = axios
    .request(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("And error occurred");
      console.error(error);
    });
  return word;
};

const fetchWordDescription = (word: string) => {
  const options = {
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  };

  const description = axios
    .request(options)
    .then((response) => {
      return response.data[0].meanings[0].definitions[0].definition;
    })
    .catch((error) => {
      console.error(error);
    });
  return description;
};

export const translateWord = (word: string, language: string) => {
  const options = {
    method: "POST",
    url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.google_api_key}`,
    data: {
      q: word,
      source: "en",
      target: language,
      format: "text",
    },
  };

  const translated = axios
    .request(options)
    .then((response) => {
      return response.data.data.translations[0].translatedText;
    })
    .catch((error) => {
      console.error(error);
    });
  return translated;
};

const storeWordOfTheDay = async (wordOfTheDay: any) => {
  const db = fs.firestore();
  const res = await db
    .collection("words")
    .doc(wordOfTheDay.translation)
    .set(wordOfTheDay);
  return;
};
