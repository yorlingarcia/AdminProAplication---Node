import { Uuid } from "../../config";
import { CustomError } from "../../domain";

import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { UpdateImg } from "../helpers/update-img";

export class UploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    id: string,
    file: UploadedFile,
    type: string,
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    const folder = type ? `uploads/${type}` : "uploads";
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        );
      }
      const destination = path.resolve(__dirname, "../../", folder);
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      UpdateImg(type, id, fileName);

      return { fileName };
    } catch (error) {
      throw error;
    }
  }

  async getFiles(type: string, photo: string) {
    let pathImg = path.join(__dirname, "../../", `uploads/${type}/${photo}`);
    if (!fs.existsSync(pathImg)) {
      // throw CustomError.badRequest(`Not Found directory`);
      return path.join(__dirname, "../../", `uploads/no-img.jpg`);
    }
    return pathImg;
  }
}
