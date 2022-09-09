import { Router, Request, Response } from "express";
import apiRouter from "./api";

const routes = Router();

//pages
const homeView = (req: Request, res: Response) => {
  res.render("home", {
    data: { name: "David", people: ["Maria", "John", "Aron"] },
  });
};

const aboutView = (req: Request, res: Response) => {
  res.render("about", {});
};

//routes
routes.route("/").get(homeView);
routes.route("/about").get(aboutView);
routes.use("/api", apiRouter);

export default routes;
