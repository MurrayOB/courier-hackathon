import fs from "firebase-admin";

export const subscribe = async (email: string, language: string) => {
  //add to database
  const db = fs.firestore();
  const data = { email: email, language: language };
  const res = await db.collection("users").doc(email).set(data);
  return;
};

export const unsubscribe = async (email: string) => {
  //remove from database
  const db = fs.firestore();
  const res = await db.collection("users").doc(email).delete();
  return;
};
