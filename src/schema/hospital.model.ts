import { Schema, model } from "mongoose";

export interface IHospital {
  Region: string;
  District: string;
  FacilityName: string;
  Type: string;
  Town: string;
  Ownership: string;
  Latitude: string;
  Longitude: string;
  ImgUrl: string;
}
const hospitalSchema = new Schema<IHospital>({
  Region: { type: String },
  District: { type: String },
  FacilityName: { type: String },
  Type: { type: String },
  Town: { type: String },
  Ownership: { type: String },
  Latitude: { type: String },
  Longitude: { type: String },
  ImgUrl: { type: String },
});
const hospital = model<IHospital>("Hospital", hospitalSchema);
export default hospital;
