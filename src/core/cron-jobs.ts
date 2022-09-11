import CronJob from "node-cron";
import { createWordOfTheDay } from "../services/fetch-random-word";

export const initScheduledJobs = async () => {
  const scheduledJobFunction = CronJob.schedule("0 6 * * *", () => {
    createWordOfTheDay();
  });

  scheduledJobFunction.start();
};

initScheduledJobs();
