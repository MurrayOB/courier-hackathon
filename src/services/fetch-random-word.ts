import axios from "axios";
import { startOfDay } from "date-fns";
import fs from "firebase-admin";
import { IUser } from "../models/user";
import { IWordOfTheDay } from "../models/word-of-the-day";
import { fetchAllUsers } from "./user";
import { fetchWordOfTheDay } from "./word-of-the-day";
import * as _ from "lodash";
import { mailWord } from "./mail";

export const sendWordOfTheDay = async (wordOfTheDay: IWordOfTheDay) => {
  // const wordOfTheDay: IWordOfTheDay = await fetchWordOfTheDay();
  const users: IUser[] = await fetchAllUsers();
  //combine users with the same chosen language
  const groupedByLanguage: any = _.values(_.groupBy(users, "language"));
  //translate word for all the user
  for (const x of groupedByLanguage) {
    const users: IUser[] = x as IUser[];
    const language = users[0].language;
    const translatedWord = await translateWord(
      wordOfTheDay.translation,
      language
    );
    let newWordOfTheDay = wordOfTheDay;
    newWordOfTheDay.word = translatedWord;
    //send to users who subscribe to the same language
    await mailWord(users, newWordOfTheDay);
  }
};

//create word of the day and store it
export const createWordOfTheDay = async () => {
  const englishWord = await fetchRandomEnglishWord();
  const wordDescription = await fetchWordDescription(englishWord);
  const spanishWord = await translateWord(englishWord, "es");
  const germanWord = await translateWord(englishWord, "de");
  const wordOfTheDay: IWordOfTheDay = {
    translation: englishWord,
    description: wordDescription,
    date: startOfDay(new Date()),
    spanish: spanishWord,
    german: germanWord,
  };
  await storeWordOfTheDay(wordOfTheDay);
  await sendWordOfTheDay(wordOfTheDay);
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
