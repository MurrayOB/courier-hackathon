import fs from "firebase-admin";
import { IUser } from "../models/user";

export const fetchAllUsers = async (): Promise<IUser[]> => {
  const db = fs.firestore();
  const userSnapshot = await db.collection("users").get();
  const data = userSnapshot.docs.map((doc) => doc.data());
  const users: IUser[] = data as IUser[];
  return users;
};
