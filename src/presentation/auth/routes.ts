import { Router } from "express";
import { check } from "express-validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new AuthService();
    const handleErrorService = new HandleErrorService();
    const controller = new AuthController(userService, handleErrorService);

    // Definir las rutas
    router.post("/", controller.loginUser);

    return router;
  }
}
