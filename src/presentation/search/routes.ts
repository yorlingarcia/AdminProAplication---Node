import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HandleErrorService } from "../services/handle-error.service";
import { SearchController } from "./controller";
import { SearchService } from "../services/search.service";

export class SearchRoutes {
  static get routes(): Router {
    const router = Router();
    const searchService = new SearchService();
    const handleErrorService = new HandleErrorService();
    const controller = new SearchController(searchService, handleErrorService);

    // Definir las rutas
    router.get("/:search", [AuthMiddleware.validateJwt], controller.search);
    router.get(
      "/colection/:table/:search",
      [AuthMiddleware.validateJwt],
      controller.searchCollection
    );

    return router;
  }
}
