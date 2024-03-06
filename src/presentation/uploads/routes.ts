import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { UploadController } from "./controller";
import { UploadService } from "../services/upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class UploadRoutes {
  static get routes(): Router {
    const router = Router();
    const uploadService = new UploadService();
    const handleErrorService = new HandleErrorService();
    const controller = new UploadController(uploadService, handleErrorService);

    // router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(["users", "hospitals", "medicals"]));

    // Definir las rutas
    router.put(
      "/:type/:id",
      [FileUploadMiddleware.containFiles, AuthMiddleware.validateJwt],
      controller.uploadFile
    );

    router.get(
      "/:type/:photo",
      [AuthMiddleware.validateJwt],
      controller.getFile
    );

    return router;
  }
}
