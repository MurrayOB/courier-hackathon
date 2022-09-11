import { createWordOfTheDay } from "../services/fetch-random-word";
import { getFirebaseCredentials } from "./firebase";
import fs, { ServiceAccount } from "firebase-admin";

const firebaseCredentials = getFirebaseCredentials();
fs.initializeApp({
  credential: fs.credential.cert(<ServiceAccount>firebaseCredentials),
});

createWordOfTheDay();
