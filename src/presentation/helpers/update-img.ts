import path from "path";
import { HospitalModel, MedicalModel, UserModel } from "../../data";
import { CustomError } from "../../domain";
import fs from "fs";

const delteImg = (path: string) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const UpdateImg = async (type: string, id: string, fileName: string) => {
  switch (type) {
    case "medicals":
      const medical = await MedicalModel.findById(id);

      if (!medical)
        throw CustomError.notFound(`Medical with id "${id} not found`);
      const oldPathMedical = `./uploads/${type}/${medical.img}`;
      const destinationMedical = path.resolve(
        __dirname,
        "../../",
        oldPathMedical
      );

      delteImg(destinationMedical);

      medical.img = fileName;
      await medical.save();

      return true;

    case "hospitals":
      const hospital = await HospitalModel.findById(id);
      if (!hospital)
        throw CustomError.notFound(`Medical with id "${id} not found`);
      const oldPathHospital = `./uploads/${type}/${hospital.img}`;
      const destinationHospital = path.resolve(
        __dirname,
        "../../",
        oldPathHospital
      );

      delteImg(destinationHospital);

      hospital.img = fileName;
      await hospital.save();

      return true;
      break;
    case "users":
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.notFound(`Medical with id "${id} not found`);
      const oldPathUser = `./uploads/${type}/${user.img}`;
      const destinationUser = path.resolve(__dirname, "../../", oldPathUser);

      delteImg(destinationUser);

      user.img = fileName;
      await user.save();

      return true;
      break;

    default:
      throw CustomError.internalServer("Not valid Type");
      break;
  }
};
