import { Router } from "express";
import exampleRouter from "./example";

const routes = Router();

routes.use("/example", exampleRouter);

export default routes;
