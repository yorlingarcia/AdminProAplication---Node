import { Request, Response } from "express";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { AuthService } from "../services/auth.service";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";
import { HandleErrorService } from "../services/handle-error.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly handleErrorservice: HandleErrorService
  ) {} //

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };
}
