import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static ValidateFields(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  }

  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({
        error: "No token provided",
      });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.id);

      if (!user) return res.status(401).json({ error: "Invalid token - user" });

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async validateAdminRole(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.body.user.id;
    try {
      const user = await UserModel.findById(id);

      if (!user)
        return res.status(401).json({ error: "Usuario no encontrado" });

      if (user.role !== "ADMIN_ROLE")
        return res
          .status(401)
          .json({ error: "No tiene privilegios de administrador" });

      next();
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
