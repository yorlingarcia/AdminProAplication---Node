import { Router } from "express";
import { UsersRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { HospitalsRoutes } from "./hospitals/routes";
import { MedicalsRoutes } from "./medicals/routes";
import { SearchRoutes } from "./search/routes";
import { UploadRoutes } from "./uploads/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/users", UsersRoutes.routes);
    router.use("/api/login", AuthRoutes.routes);
    router.use("/api/hospitals", HospitalsRoutes.routes);
    router.use("/api/medicals", MedicalsRoutes.routes);
    router.use("/api/search", SearchRoutes.routes);
    router.use("/api/upload", UploadRoutes.routes);

    return router;
  }
}
