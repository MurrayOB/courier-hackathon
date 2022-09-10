import { Request, Response } from "express";
import {
  subscribe as subscribeToApp,
  unsubscribe as unsubscribeFromApp,
} from "../services/subscription";
import fs from "firebase-admin";

const subscribe = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const language = req.query.lang as string;
  if (!email)
    return res
      .status(200)
      .json({ success: false, message: "No email provided" });
  if (!language)
    return res
      .status(200)
      .json({ success: false, message: "No language provided" });
  await subscribeToApp(email, language);
  return res.status(202).json({ success: true, message: "Subscribed" });
};

const unsubscribe = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email)
    return res
      .status(200)
      .json({ success: false, message: "No email provided" });
  await unsubscribeFromApp(email);
  return res.status(200).json({ success: true, message: "Unsubscribed" });
};

export { subscribe, unsubscribe };
