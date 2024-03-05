import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { MedicalsController } from "./controller";
import { MedicalService } from "../services/medical.service";

export class MedicalsRoutes {
  static get routes(): Router {
    const router = Router();
    const medicalService = new MedicalService();
    const handleErrorService = new HandleErrorService();
    const controller = new MedicalsController(
      medicalService,
      handleErrorService
    );

    // Definir las rutas
    router.get("/", controller.getMedicals);
    router.post("/", controller.createMedical);
    router.put("/:id", controller.updateMedical);
    router.delete("/:id", controller.deleteMedical);
    return router;
  }
}
