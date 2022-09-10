import { Router } from "express";
import { homeView } from "../controllers/home";
import apiRouter from "./api";

const routes = Router();

//routes
routes.route("/").get(homeView);
routes.use("/api", apiRouter);

export default routes;
