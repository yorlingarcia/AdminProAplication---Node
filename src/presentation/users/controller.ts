import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";
import { UserService } from "../services/user.service";
import { HandleErrorService } from "../services/handle-error.service";

export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  createUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.userService
      .registerUser(registerUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getUsers = async (req: Request, res: Response) => {
    this.userService
      .getUsers()
      .then((users) => res.json(users))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const [error, updateUserDto] = UpdateUserDto.update({
      id,
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.userService
      .updateUser(updateUserDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.userService
      .deleteUser(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
