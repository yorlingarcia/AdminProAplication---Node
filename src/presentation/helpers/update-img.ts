import path from "path";
import { HospitalModel, MedicalModel, UserModel } from "../../data";
import { CustomError } from "../../domain";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

const delteImg = (path: string) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const UpdateImg = async (
  type: string,
  id: string,
  fileName: string,
  pathFile: string
) => {
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
      try {
        const { url } = await cloudinary.uploader.upload(pathFile, {
          public_id: fileName.split(".").at(0),
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        });
        medical.img = url;
        await medical.save();

        return true;
      } catch (error) {
        throw CustomError.badRequest(`${error}`);
      }

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

      try {
        const { url } = await cloudinary.uploader.upload(pathFile, {
          public_id: fileName.split(".").at(0),
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        });
        hospital.img = url;
        await hospital.save();
        return true;
      } catch (error) {
        throw CustomError.badRequest(`${error}`);
      }

    case "users":
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.notFound(`User with id "${id} not found`);
      const oldPathUser = `./uploads/${type}/${user.img}`;
      const destinationUser = path.resolve(__dirname, "../../", oldPathUser);

      delteImg(destinationUser);
      try {
        const { url } = await cloudinary.uploader.upload(pathFile, {
          public_id: fileName.split(".").at(0),
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        });
        user.img = url;
        await user.save();
        return true;
      } catch (error) {
        throw CustomError.badRequest(`${error}`);
      }

    default:
      throw CustomError.internalServer("Not valid Type");
      break;
  }
};
