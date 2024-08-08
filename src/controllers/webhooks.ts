import triggerQueue from "../queues/trigger";

export const randomWebhookHandler = async (req: any, res: any) => {
  const message = "User Onboarded";
  const userEmail = "tamilan.arasu@gmail.com";

  await triggerQueue.add(`random-job`, { message, userEmail });

  return res.json({ message: "Received" });
};
