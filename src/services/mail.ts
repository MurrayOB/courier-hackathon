import { CourierClient } from "@trycourier/courier";
import { IUser } from "../models/user";
import { IWordOfTheDay } from "../models/word-of-the-day";
import { getLanguageNameByCode } from "./language";

export const mailWord = async (users: IUser[], wordOfTheDay: IWordOfTheDay) => {
  const courier = CourierClient({
    authorizationToken: process.env.courier_api_key,
  });

  //create bulk list
  const list = users.map((user) => {
    return {
      email: user.email,
      data: {
        name: user.email,
        word: wordOfTheDay.word,
        language: getLanguageNameByCode(user.language),
        translation: wordOfTheDay.translation,
        description: wordOfTheDay.description,
      },
    };
  });

  const { requestId } = await courier.send({
    message: {
      to: list,
      template: "HECEE75KFB4V01PTKX7F06H6F5ZP",
    },
  });
};
