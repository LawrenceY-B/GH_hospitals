import mongoose from "mongoose";



export const DB_Connection = async () => {
let url = process.env.MONGODBURL as string;
    mongoose
    .connect(`${url}`, {})
    .then(() => {
      console.debug("MongoDB connected!!");
    })
    .catch((err: Error) => {
      console.error("Failed to connect to MongoDB", err);
    });
};



