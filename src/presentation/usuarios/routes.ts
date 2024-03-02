import { Router } from "express";
import { UsersController } from "./controller";
import { AuthService } from "../services/auth.service";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new UsersController(authService);

    // Definir las rutas
    router.get("/", controller.getUsers);
    router.post("/", controller.createUser);
    return router;
  }
}
