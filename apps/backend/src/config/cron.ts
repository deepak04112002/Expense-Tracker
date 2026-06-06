import cron from "cron";
import https from "https";

// create a cron job that runs every 14 minutes
export default function job(): cron.CronJob {
  return new cron.CronJob("*/14 * * * *", () => {
    https
      .get(process.env.API_URL || "", (res) => {
        if (res.statusCode === 200) {
          console.log("GET request sent successfully");
        } else {
          console.log("GET request failed", res.statusCode);
        }
      })
      .on("error", (e) => console.error("Error while sending request", e));
  });
}
