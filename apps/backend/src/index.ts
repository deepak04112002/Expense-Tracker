import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter"
import transactionRoutes from "./routes/transactionRoutes";
import job from "./config/cron";

const PORT = process.env.PORT;
const app = express();

if(process.env.NODE_ENV === "production"){
  job().start();
}

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use(transactionRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.send("The Server is running smoothly");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
