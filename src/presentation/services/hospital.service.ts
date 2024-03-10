import { HospitalModel } from "../../data";
import {
  CreateHospitalDto,
  CustomError,
  PaginationDto,
  UpdateHospitalDto,
} from "../../domain";

export class HospitalService {
  constructor() {}

  public async createHospital(createHospitalDto: CreateHospitalDto) {
    try {
      const hospital = new HospitalModel(createHospitalDto);

      await hospital.save();

      return {
        hospital: hospital,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getHospitals(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      // const hospitals = await HospitalModel.find().populate("user", "name img");
      // return { hospitals };

      const [total, hospitals] = await Promise.all([
        HospitalModel.countDocuments(),
        HospitalModel.find()
          .populate("user", "name img")
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
        hospitals,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateHospital(updateHospitalDto: UpdateHospitalDto) {
    const id = updateHospitalDto.id;

    const hospital = await HospitalModel.findById(id);
    if (!hospital)
      throw CustomError.notFound(`Hospital with id "${id}" not found`);

    try {
      const cambioHospital = {
        name: updateHospitalDto.name,
        user: updateHospitalDto.user.id,
      };
      const updateHospital = await HospitalModel.findByIdAndUpdate(
        id,
        cambioHospital,
        {
          new: true,
        }
      );
      return updateHospital;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteHospital(id: string) {
    const deleteUser = await HospitalModel.findByIdAndDelete(id);
    if (!deleteUser)
      throw CustomError.notFound(`Hospital with id "${id}" not found`);
    return deleteUser;
  }
}
