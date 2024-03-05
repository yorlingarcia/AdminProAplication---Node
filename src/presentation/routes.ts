import { Router } from "express";
import { UsersRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { HospitalsRoutes } from "./hospitals/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/users", UsersRoutes.routes);
    router.use("/api/login", AuthRoutes.routes);
    router.use("/api/hospitals", HospitalsRoutes.routes);

    return router;
  }
}
