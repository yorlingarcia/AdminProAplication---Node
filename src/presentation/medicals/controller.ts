import { Request, Response } from "express";
import {
  CustomError,
  UserEntity,
  CreateMedicalDto,
  UpdateMedicalDto,
  PaginationDto,
} from "../../domain";
import { HandleErrorService } from "../services/handle-error.service";
import { MedicalService } from "../services/medical.service";
import mongoose from "mongoose";

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
      .then((medical) => res.status(201).json(medical))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getMedicals = async (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    this.medicalService
      .getMedicals(paginationDto!)
      .then((medicals) => res.json(medicals))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  getMedicalById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: `Id "${id}" no valido` });
    this.medicalService
      .getMedicalById(id)
      .then((medical) => res.json(medical))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  updateMedical = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateMedicalDto] = UpdateMedicalDto.update({
      id,
      hospital: req.params.hospital,
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
