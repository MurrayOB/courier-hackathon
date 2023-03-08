import { Request, Response } from "express";
import { createWordOfTheDay } from "../services/fetch-random-word";

export const cron = async (req: Request, res: Response) => {
  createWordOfTheDay();
};
