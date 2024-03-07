import { HospitalModel } from "../../data";
import {
  CreateHospitalDto,
  CustomError,
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

  public async getHospitals() {
    try {
      const hospitals = await HospitalModel.find().populate("user", "name img");
      return { hospitals };
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
