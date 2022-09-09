import { Request, Response } from "express";
import { CourierClient } from "@trycourier/courier";

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
