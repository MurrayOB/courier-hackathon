import { Request, Response } from "express";
import { CourierClient } from "@trycourier/courier";

export const sendEmail = async (req: Request, res: Response) => {
  const courier = CourierClient({
    authorizationToken: process.env.courier_api_key,
  });

  const { requestId } = await courier.send({
    message: {
      content: {
        title: "Welcome to Courier!",
        body: "Want to hear a joke? {{joke}}",
      },
      data: {
        joke: "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves",
      },
      to: {
        email: process.env.courier_email,
      },
    },
  });
  return res.status(200).json({ success: true });
};
