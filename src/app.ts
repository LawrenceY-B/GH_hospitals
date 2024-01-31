import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { DB_Connection } from "./database/db";
import cors from "cors";
import fs from "fs";
import hospital from "./schema/hospital.model";

const app = express();
dotenv.config();
const server = createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const text = new RegExp(name as string, "i");
    const HospitalData = await hospital.find({ FacilityName: text });
    if (!HospitalData) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: HospitalData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/get-types", async (req: Request, res: Response) => {
  try {
    const types = await hospital.distinct("Type");
    if (!types) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/get-regions", async (req: Request, res: Response) => {
  try {
    const regions = await hospital.distinct("Region");
    if (!regions) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: regions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/get-districts", async (req: Request, res: Response) => {
  try {
    const districts = await hospital.distinct("District");
    if (!districts) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: districts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/find/town", async (req: Request, res: Response) => {
  try {
const{name}=req.body
const text = new RegExp(name as string, "i");
const HospitalData = await hospital.find({ Town: text });
    if (!HospitalData) {
      res.status(404).json({ success: false, message: "No Town found" });
    }
    res.status(200).json({ success: true, data: HospitalData });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/get-ownerships", async (req: Request, res: Response) => {
  try {
    const ownerships = await hospital.distinct("Ownership");
    if (!ownerships) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: ownerships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

server.listen(port, async () => {
  await DB_Connection();
  console.log(`Server is running on port ${port}`);
});
