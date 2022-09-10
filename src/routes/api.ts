import { Router } from "express";
import { subscribe, unsubscribe } from "../controllers/user";

const apiRouter = Router();

apiRouter.route("/user/subscribe").post(subscribe);
apiRouter.route("/user/unsubscribe").post(unsubscribe);

export default apiRouter;
