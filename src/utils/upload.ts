import hospital from "../schema/hospital.model";
import fs from "fs";
import csvtojson from "csvtojson";

export const converttojson = () => {
  const csvFilePath = "src/csv/HEALTH FACILITY LOCATION.csv";

  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      fs.writeFile(
        "src/json/ghHospital.json",
        JSON.stringify(jsonObj, null, 2),
        (err) => {
          if (err) {
            throw err;
          }
          console.log("JSON array is saved.");
        }
      );
    });
};

export const importData = async () => {
  let dataImported = false;

  if (!dataImported) {
    try {
      // Read data from JSON file
      const data = JSON.parse(
        fs.readFileSync("src/json/ghHospital.json", "utf-8")
      );

      // Import data into the database
      await hospital.insertMany(data);

      console.log("Data successfully imported");
      dataImported = true;
    } catch (error) {
      console.error("Error during data import:", error);
    }
  }
};
