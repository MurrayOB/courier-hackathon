import { Router } from "express";
import { fetchExample } from "../controllers/example";

const exampleRouter = Router();

exampleRouter.route("/").get(fetchExample);

export default exampleRouter;
