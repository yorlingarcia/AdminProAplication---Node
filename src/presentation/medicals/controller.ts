import { Request, Response } from "express";
import {
  CustomError,
  LoginUserDto,
  CreateUserDto,
  UserEntity,
} from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserService } from "../services/user.service";
import { HandleErrorService } from "../services/handle-error.service";
import { MedicalService } from "../services/medical.service";

export class MedicalsController {
  constructor(
    private readonly medicalService: MedicalService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  createMedical = async (req: Request, res: Response) => {
    // const [error, registerUserDto] = RegisterUserDto.create({
    //   ...req.body,
    // });

    // if (error) return res.status(400).json({ error });

    this.medicalService
      .createMedical()
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getMedicals = async (req: Request, res: Response) => {
    this.medicalService
      .getMedicals()
      .then((users) => res.json(users))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  updateMedical = async (req: Request, res: Response) => {
    // const id = req.params.id;

    // const [error, updateUserDto] = UpdateUserDto.update({
    //   id,
    //   ...req.body,
    // });

    // if (error) return res.status(400).json({ error });

    this.medicalService
      .updateMedical()
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  deleteMedical = async (req: Request, res: Response) => {
    // const id = req.params.id;
    this.medicalService
      .deleteMedical()
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
