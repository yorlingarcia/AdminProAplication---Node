import { Request, Response } from "express";
import { CustomError, GoogleSignInDto, LoginUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
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
      .catch((error) => this.handleErrorservice.handleError(error, res));
  };

  googleSignIn = async (req: Request, res: Response) => {
    const [error, googlesignInDto] = GoogleSignInDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.authService
      .googleSignIn(googlesignInDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorservice.handleError(error, res));
  };

  renewToken = async (req: Request, res: Response) => {
    const user = req.body.user;

    this.authService
      .renewToken(user)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorservice.handleError(error, res));
  };
}
