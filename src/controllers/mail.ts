import { Request, Response } from "express";
import { CourierClient } from "@trycourier/courier";
import fs from "firebase-admin";
import * as _ from "lodash";
import { IWordOfTheDay } from "../models/word-of-the-day";
import { translateWord } from "../services/fetch-random-word";

export interface IUser {
  email: string;
  language: string;
}

export const sendWordOfTheDay = async (req: Request, res: Response) => {
  const db = fs.firestore();
  //word
  const snapshot = await db
    .collection("words")
    .where("date", "<=", new Date())
    .get();
  const wordRef: any = snapshot.docs.map((doc) => doc.data());
  const wordOfTheDay: IWordOfTheDay = wordRef[0];
  //users
  const userSnapshot = await db.collection("users").get();
  const data = userSnapshot.docs.map((doc) => doc.data());
  const users: IUser[] = data as IUser[];
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
    //send email to individual users
    for (const user of users) {
      let newWordOfTheDay = wordOfTheDay;
      newWordOfTheDay.word = translatedWord;
      await mailWord(user, newWordOfTheDay);
    }
  }
  return res.status(200).json({ message: "Fetched users" });
};

const mailWord = async (user: IUser, wordOfTheDay: IWordOfTheDay) => {
  const courier = CourierClient({
    authorizationToken: process.env.courier_api_key,
  });
  const { requestId } = await courier.send({
    message: {
      to: {
        email: user.email,
      },
      template: "HECEE75KFB4V01PTKX7F06H6F5ZP",
      data: {
        name: user.email,
        word: wordOfTheDay.word,
        language: user.language,
        translation: wordOfTheDay.translation,
        description: wordOfTheDay.description,
      },
    },
  });
};

export const sendEmail = async (req: Request, res: Response) => {
  const courier = CourierClient({
    authorizationToken: process.env.courier_api_key,
  });

  const { requestId } = await courier.send({
    message: {
      to: {
        email: "",
      },
      template: "HECEE75KFB4V01PTKX7F06H6F5ZP",
      data: {
        name: "Murray",
        word: "Hola",
        language: "Spanish",
        translation: "Hello",
        description: "To greet someone",
      },
    },
  });
  return res.status(200).json({ success: true });
};
