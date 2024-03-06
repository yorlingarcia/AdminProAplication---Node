import { Request, Response } from "express";
import { HandleErrorService } from "../services/handle-error.service";
import { UploadService } from "../services/upload.service";
import { UploadedFile } from "express-fileupload";

export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  uploadFile = async (req: Request, res: Response) => {
    const id = req.params.id;
    const type = req.params.type;
    const file = req.files?.files as UploadedFile;

    this.uploadService
      .uploadSingle(id, file, type)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getFile = async (req: Request, res: Response) => {
    const photo = req.params.photo;
    const type = req.params.type;

    this.uploadService
      .getFiles(type, photo)
      .then((path) => res.sendFile(path))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
