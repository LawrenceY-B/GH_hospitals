import { NextFunction, Request, Response } from "express";
import hospital from "../schema/hospital.model";
import { error } from "console";
import { validateQuery } from "../services/hospital.service";

export const searchHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateQuery(req.body);
    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { name } = req.body;
    const text = new RegExp(name as string, "i");
    const HospitalData = await hospital.find({ FacilityName: text });
    if (!HospitalData || HospitalData.length === 0) {
      res.status(200).json({ success: true,data: [], message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: HospitalData , message:`${HospitalData.length} hospital(s) found`});
  } catch (error) {
    next(error);
  }
};
export const findTown = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateQuery(req.body);
    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { name } = req.body;
    const text = new RegExp(name as string, "i");
    const HospitalData = await hospital.find({ Town: text }).distinct("Town");
    if (!HospitalData || HospitalData.length === 0) {
      res.status(404).json({ success: false, message: "No Town found" });
    }
    res.status(200).json({ success: true, data: HospitalData });
  } catch (error) {
    next(error);
  }
};
export const getTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const types = await hospital.distinct("Type");
    if (!types) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    next(error);
  }
};
export const getRegions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const regions = await hospital.distinct("Region");
    if (!regions) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: regions });
  } catch (error) {
    next(error);
  }
};
export const getDistricts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const districts = await hospital.distinct("District");
    if (!districts) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: districts });
  } catch (error) {
    next(error);
  }
};
export const getOwnerships = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerships = await hospital.distinct("Ownership");
    if (!ownerships) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: ownerships });
  } catch (error) {
    next(error);
  }
};
export const getAllHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hospitals = await hospital
      .find({})
      .select("FacilityName Town Region Latitude Longitude");

    if (!hospitals) {
      res.status(404).json({ success: false, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    next(error);
  }
};


export const filter = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {ownership,type,town} =req.query
    console.log("Owner: " + ownership + " Type: " + type + " Town: " + town)
    const text = new RegExp(town as string, "i");

    const HospitalData = await hospital.find({$and:[{Ownership:ownership},{Type:type},{Town:text}]})
    if (!HospitalData || HospitalData.length === 0) {
      res.status(404).json({ success: true, message: "No hospital found" });
    }
    res.status(200).json({ success: true, data: HospitalData });
  } catch (error) {
    next(error);
  }
}