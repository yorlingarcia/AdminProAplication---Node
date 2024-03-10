import { MedicalModel } from "../../data";
import {
  CreateMedicalDto,
  CustomError,
  PaginationDto,
  UpdateMedicalDto,
} from "../../domain";

export class MedicalService {
  constructor() {}

  public async createMedical(createMedicalDto: CreateMedicalDto) {
    try {
      const medical = new MedicalModel(createMedicalDto);
      await medical.save();

      return {
        medical: medical,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getMedicals(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, medicals] = await Promise.all([
        MedicalModel.countDocuments(),
        MedicalModel.find()
          .populate("user", "name img")
          .populate("hospital", "name img")
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        next:
          page * limit < total
            ? `/api/hospitals?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0
            ? `/api/hospitals?page=${page - 1}&limit=${limit}`
            : null,
        medicals,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getMedicalById(id: string) {
    try {
      const medical = await MedicalModel.findById(id)
        .populate("user", "name img")
        .populate("hospital", "name img");

      if (!medical)
        throw CustomError.notFound(`Medical with id "${id}" not found`);
      return {
        medical,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateMedical(updateMedicalDto: UpdateMedicalDto) {
    const id = updateMedicalDto.id;

    try {
      const medical = await MedicalModel.findById(id);
      if (!medical)
        throw CustomError.notFound(`Medical with id "${id}" not found`);
      const cambioMedical = {
        name: updateMedicalDto.name,
        user: updateMedicalDto.user.id,
        hospital: updateMedicalDto.hospital,
      };
      const updateUSer = await MedicalModel.findByIdAndUpdate(
        id,
        cambioMedical,
        {
          new: true,
        }
      );
      return updateUSer;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteMedical(id: string) {
    const deleteUser = await MedicalModel.findByIdAndDelete(id);
    if (!deleteUser)
      throw CustomError.notFound(`Medical with id "${id}" not found`);
    return deleteUser;
  }
}
