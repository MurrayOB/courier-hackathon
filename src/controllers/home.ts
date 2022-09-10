import { Request, Response } from "express";
import { languages } from "../core/constants/languages";

export const homeView = (req: Request, res: Response) => {
  res.render("home", {
    data: { languages: languages },
  });
};
