import { Router, Request, Response } from "express";
import apiRouter from "./example";

const routes = Router();

//pages
const homeView = (req: Request, res: Response) => {
  res.render("home", {
    data: { name: "David", people: ["Maria", "John", "Aron"] },
  });
};

//routes
routes.route("/").get(homeView);
routes.use("/api", apiRouter);

export default routes;
