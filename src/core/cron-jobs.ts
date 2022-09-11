import CronJob from "node-cron";
import { createWordOfTheDay } from "../services/fetch-random-word";

export const initScheduledJobs = async () => {
  const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
    createWordOfTheDay();
  });

  scheduledJobFunction.start();
};

initScheduledJobs();
