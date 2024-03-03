import { Router } from "express";
import { UsersController } from "./controller";
import { check } from "express-validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { UserService } from "../services/user.service";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const handleErrorService = new HandleErrorService();
    const controller = new UsersController(userService, handleErrorService);

    // Definir las rutas
    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);
    router.post("/", controller.createUser);
    router.put("/:id", [AuthMiddleware.validateJwt], controller.updateUser);
    router.delete("/:id", [AuthMiddleware.validateJwt], controller.deleteUser);
    return router;
  }
}
