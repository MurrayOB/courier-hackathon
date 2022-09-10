import { IWordOfTheDay } from "../models/word-of-the-day";
import fs from "firebase-admin";

export const fetchWordOfTheDay = async (): Promise<IWordOfTheDay> => {
  const db = fs.firestore();
  const snapshot = await db
    .collection("words")
    .where("date", "<=", new Date())
    .get();
  const wordRef: any = snapshot.docs.map((doc) => doc.data());
  const wordOfTheDay: IWordOfTheDay = wordRef[0];
  return wordOfTheDay;
};
