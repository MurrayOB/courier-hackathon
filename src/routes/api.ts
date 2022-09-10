import { Router } from "express";
import { subscribe, unsubscribe } from "../controllers/user";

const apiRouter = Router();

apiRouter.route("/user/subscribe").get(subscribe);
apiRouter.route("/user/unsubscribe").get(unsubscribe);

export default apiRouter;
