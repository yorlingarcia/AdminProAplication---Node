import { Router } from "express";
import { HandleErrorService } from "../services/handle-error.service";
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
    router.post("/google", controller.googleSignIn);
    return router;
  }
}
