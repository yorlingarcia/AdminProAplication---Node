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
    const type = req.params.type;
    const file = req.files?.files as UploadedFile;

    this.uploadService
      .uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
