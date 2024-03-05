import { Request, Response } from "express";
import {
  CustomError,
  LoginUserDto,
  CreateUserDto,
  UserEntity,
  CreateHospitalDto,
} from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserService } from "../services/user.service";
import { HandleErrorService } from "../services/handle-error.service";
import { HospitalService } from "../services/hospital.service";

export class HospitalsController {
  constructor(
    private readonly hospitalService: HospitalService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  createHospital = async (req: Request, res: Response) => {
    const [error, createHospitalDto] = CreateHospitalDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) return res.status(400).json({ error });

    this.hospitalService
      .createHospital(createHospitalDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getHospitals = async (req: Request, res: Response) => {
    this.hospitalService
      .getHospitals()
      .then((users) => res.json(users))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  updateHospital = async (req: Request, res: Response) => {
    // const id = req.params.id;
    // const [error, updateUserDto] = UpdateUserDto.update({
    //   id,
    //   ...req.body,
    // });
    // if (error) return res.status(400).json({ error });

    this.hospitalService
      .updateHospital()
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  deleteHospital = async (req: Request, res: Response) => {
    // const id = req.params.id;
    this.hospitalService
      .deleteHospital()
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
