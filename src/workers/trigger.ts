import { Worker } from "bullmq";
import { connection } from "../config";

export const worker = new Worker(
  "trigger",
  async (job) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Job Done", job.data);
      return {
        message: "Email Journey for user started!",
      };
    } catch (e) {
      console.log("Error", e);
      throw e;
    }
  },
  connection
);

worker.on("completed", (job: any) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job: any, err: any) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

process.on("SIGTERM", async () => {
  await worker.close();
});
