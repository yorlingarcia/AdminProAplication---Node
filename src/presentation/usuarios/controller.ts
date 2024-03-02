import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class UsersController {
  users = {
    ok: true,
    usuarios: [
      {
        id: 123,
        name: "yorlin",
      },
    ],
  };
  constructor(private readonly authService: AuthService) {} //

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  createUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = async (req: Request, res: Response) => {
    this.authService
      .getUsers()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };
}
