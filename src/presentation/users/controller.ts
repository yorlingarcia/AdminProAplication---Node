import { Request, Response } from "express";
import { CreateUserDto, PaginationDto } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserService } from "../services/user.service";
import { HandleErrorService } from "../services/handle-error.service";

export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  createUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = CreateUserDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.userService
      .registerUser(registerUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.userService
      .getUsers(paginationDto!)
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
