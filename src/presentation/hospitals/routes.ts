import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { HospitalsController } from "./controller";
import { HospitalService } from "../services/hospital.service";

export class HospitalsRoutes {
  static get routes(): Router {
    const router = Router();
    const hospitalService = new HospitalService();
    const handleErrorService = new HandleErrorService();
    const controller = new HospitalsController(
      hospitalService,
      handleErrorService
    );

    // Definir las rutas
    router.get("/", [AuthMiddleware.validateJwt], controller.getHospitals);
    router.post("/", [AuthMiddleware.validateJwt], controller.createHospital);
    router.put("/:id", [AuthMiddleware.validateJwt], controller.updateHospital);
    router.delete(
      "/:id",
      [AuthMiddleware.validateJwt],
      controller.deleteHospital
    );
    return router;
  }
}
