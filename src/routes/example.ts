import { Router } from "express";
import { sendEmail } from "../controllers/courier";

const apiRouter = Router();

apiRouter.route("/").get(sendEmail);

export default apiRouter;
