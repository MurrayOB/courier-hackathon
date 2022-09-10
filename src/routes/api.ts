import { Router } from "express";
import { sendEmail, sendWordOfTheDay } from "../controllers/mail";
import { subscribe, unsubscribe } from "../controllers/user";
import { getWord } from "../controllers/word";

const apiRouter = Router();

apiRouter.route("/").get(sendEmail);
apiRouter.route("/user/subscribe").post(subscribe);
apiRouter.route("/user/unsubscribe").post(unsubscribe);
//development only:
apiRouter.route("/get-word").get(getWord);
apiRouter.route("/send-test").get(sendWordOfTheDay);

export default apiRouter;
