import { Router } from "express";
import { UsersController } from "./controller";
import { AuthService } from "../services/auth.service";
import { check } from "express-validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new UsersController(authService);

    // Definir las rutas
    router.get("/", controller.getUsers);
    router.post(
      "/",
      // [
      //   check("name", "El nombre es obligatorio"),
      //   check("password", "El password es obligatorio"),
      //   check("email", "El email es obligatorio"),
      //   AuthMiddleware.ValidateFields,
      // ],
      controller.createUser
    );
    return router;
  }
}
