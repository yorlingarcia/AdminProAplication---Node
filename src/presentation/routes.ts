import { Router } from "express";
import { UsersRoutes } from "./usuarios/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/users", UsersRoutes.routes);

    return router;
  }
}
