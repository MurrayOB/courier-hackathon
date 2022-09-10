import { Request, Response } from "express";
import {
  subscribe as subscribeToApp,
  unsubscribe as unsubscribeFromApp,
} from "../services/subscription";
import fs from "firebase-admin";

const subscribe = async (req: Request, res: Response) => {
  const email = "";
  const language = "af";
  await subscribeToApp(email, language);
  return res.status(202).json({ success: true, message: "Subscribed" });
};

const unsubscribe = async (req: Request, res: Response) => {
  const email = "";
  await unsubscribeFromApp(email);
  return res.status(200).json({ success: true, message: "Unsubscribed" });
};

const fetchUsers = async (req: Request, res: Response) => {
  const db = fs.firestore();
};

export { subscribe, unsubscribe };
