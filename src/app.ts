import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { DB_Connection } from "./database/db";
import cors from "cors";
import fs from "fs";
import hospital from "./schema/hospital.model";
import ErrorHandler from "./middlewares/errorhandler";
import hospitalRoutes from "./routes/hospital.routes";
import { ImgScrapper } from "./utils/scrapper";

const app = express();
dotenv.config();
const server = createServer(app);
const port = process.env.PORT || 8080;

app
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: true }));
app.use("/api/hospital", hospitalRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Page Not Found 😔" });
  console.warn(`${req.method} - ${req.url} - ${req.ip} Page Not Found 🔦🔦`);
});
app.use(ErrorHandler);
//Thinking of scrappin all hospitaols to get their respective images and save them to the database

// const scrapper = new ImgScrapper();
// scrapper.initiate();
server.listen(port, async () => {
  await DB_Connection();
  console.log(`Server is running on port ${port}`);
});
