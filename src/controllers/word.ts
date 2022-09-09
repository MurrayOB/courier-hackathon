import { Request, Response } from "express";
import { createWordOfTheDay } from "../services/fetch-random-word";

export const getWord = async (req: Request, res: Response) => {
  const wordOfTheDay = await createWordOfTheDay();
  return res
    .status(200)
    .json({ success: true, message: "", data: wordOfTheDay });
};
