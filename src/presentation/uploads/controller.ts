import { Request, Response } from "express";
import { HandleErrorService } from "../services/handle-error.service";
import { UploadService } from "../services/upload.service";
import { UploadedFile } from "express-fileupload";
import { UpdatePhotoDto } from "../../domain";

export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  uploadFile = async (req: Request, res: Response) => {
    const [error, updatePhotoDto] = UpdatePhotoDto.update({
      id: req.params.id,
      type: req.params.type,
      files: req.files?.files as UploadedFile,
    });

    if (error) return res.status(400).json({ error });

    this.uploadService
      .uploadSingle(updatePhotoDto!)
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
