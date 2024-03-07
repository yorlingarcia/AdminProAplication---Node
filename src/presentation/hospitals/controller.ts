import { Request, Response } from "express";
import { CreateHospitalDto, UpdateHospitalDto } from "../../domain";

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
      .then((hospitals) => res.json(hospitals))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  updateHospital = async (req: Request, res: Response) => {
    const [error, updateHospitalDto] = UpdateHospitalDto.update({
      ...req.body,
      id: req.params.id,
    });

    if (error) return res.status(400).json({ error });
    this.hospitalService
      .updateHospital(updateHospitalDto!)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };

  deleteHospital = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.hospitalService
      .deleteHospital(id)
      .then((resp) => res.json(resp))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
