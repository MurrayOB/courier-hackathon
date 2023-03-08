import { Router } from "express";
import { cron } from "../controllers/cron";
import { subscribe, unsubscribe } from "../controllers/user";

const apiRouter = Router();

apiRouter.route("/user/subscribe").get(subscribe);
apiRouter.route("/user/unsubscribe").get(unsubscribe);
apiRouter.route("/cron").get(cron);

export default apiRouter;
