import { Request, Response } from "express";
import {
  CustomError,
  UserEntity,
  CreateMedicalDto,
  UpdateMedicalDto,
} from "../../domain";
import { HandleErrorService } from "../services/handle-error.service";
import { MedicalService } from "../services/medical.service";

export class MedicalsController {
  constructor(
    private readonly medicalService: MedicalService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  createMedical = async (req: Request, res: Response) => {
    const [error, createMedicalDto] = CreateMedicalDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) return res.status(400).json({ error });

    this.medicalService
      .createMedical(createMedicalDto!)
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
    const id = req.params.id;

    const [error, updateMedicalDto] = UpdateMedicalDto.update({
      id,
      hospitalId: req.params.hospital,
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.medicalService
      .updateMedical(updateMedicalDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  deleteMedical = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.medicalService
      .deleteMedical(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
