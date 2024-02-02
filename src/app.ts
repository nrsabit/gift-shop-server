import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Gift Shop is Running");
});

export default app;
