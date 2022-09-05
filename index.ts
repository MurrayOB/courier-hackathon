import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./src/routes/index";
import path from "path";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
