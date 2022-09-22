import { Request, Response } from "express";
import { languages } from "../core/constants/languages";
import { IWordOfTheDay } from "../models/word-of-the-day";
import { fetchWordOfTheDay } from "../services/word-of-the-day";

export const homeView = async (req: Request, res: Response) => {
  let wordOfTheDay: IWordOfTheDay = await fetchWordOfTheDay();
  res.render("home", {
    data: { languages: languages, wordOfTheDay: wordOfTheDay },
  });
};
