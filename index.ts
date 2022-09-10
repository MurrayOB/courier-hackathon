import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./src/routes/index";
import fs, { ServiceAccount } from "firebase-admin";
import bodyParser from "body-parser";
import cors from "cors";
import { initScheduledJobs } from "./src/core/cron-jobs";
import { getFirebaseCredentials } from "./src/core/firebase";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(routes);
app.use(bodyParser.json());
app.use(cors);

//FIREBASE
fs.initializeApp({
  credential: fs.credential.cert(<ServiceAccount>getFirebaseCredentials()),
});

//CRON JOB
initScheduledJobs();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
