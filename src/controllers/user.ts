import { Request, Response } from "express";
import {
  subscribe as subscribeToApp,
  unsubscribe as unsubscribeFromApp,
} from "../services/subscription";
import { CourierClient } from "@trycourier/courier";
import { translateWord } from "../services/fetch-random-word";

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

  const courier = CourierClient({
    authorizationToken: process.env.courier_api_key,
  });

  const word = await translateWord("welcome", language);
  const { requestId } = await courier.send({
    message: {
      to: {
        email: email,
      },
      template: "BTBS36FJ5EMK28JAV5HF603JHBCN",
      data: {
        email: email,
        word: word,
      },
    },
  });
  return res.status(202).json({ success: true, message: "Subscribed" });
};

const unsubscribe = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email)
    return res
      .status(200)
      .json({ success: false, message: "No email provided" });
  await unsubscribeFromApp(email);
  return res.send("Unsubscribed");
};

export { subscribe, unsubscribe };
