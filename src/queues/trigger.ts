import process from "process";
import { Queue } from "bullmq";
import { connection } from "../config";

const CONNECTION_REFUSED = "ECONNREFUSED";

const triggerQueue = new Queue("trigger", connection);

process.on("SIGTERM", async () => {
  await triggerQueue.close();
});

triggerQueue.on("error", (err) => {
  console.error("Queue Error:", err); // Log any queue-related errors
  if ((err as any).code === CONNECTION_REFUSED) {
    console.error("Make sure you have installed Redis and it is running.", err);
    process.exit();
  }
});

export default triggerQueue;
