import { Router } from "express";
import { subscribe, unsubscribe } from "../controllers/user";
import { getWord } from "../controllers/word";

const apiRouter = Router();

apiRouter.route("/user/subscribe").post(subscribe);
apiRouter.route("/user/unsubscribe").post(unsubscribe);
//development only:
apiRouter.route("/get-word").get(getWord);

export default apiRouter;
