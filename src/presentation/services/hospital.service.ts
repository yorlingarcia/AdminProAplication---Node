import { JwtAdapter, bcryptAdapter } from "../../config";
import { HospitalModel } from "../../data";
import { CreateHospitalDto, CustomError } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";

export class HospitalService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async createHospital(createHospitalDto: CreateHospitalDto) {
    // const existEmail = await HospitalModel.findOne({
    //   email: registerUserDto.email,
    // });
    // if (existEmail) throw CustomError.badRequest("Email already exist");

    try {
      const hospital = new HospitalModel(createHospitalDto);

      // Encriptar password
      // user.password = bcryptAdapter.hash(registerUserDto.password);

      await hospital.save();

      // const { password, ...userEntity } = UserEntity.fromObject(user);

      // const token = await JwtAdapter.generateToken({
      //   id: userEntity.id,
      //   email: userEntity.email,
      // });
      // if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        hospital: hospital,
        // token,
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

  public async updateHospital() {
    // const id = updateUserDto.id;
    // const user = await UserModel.findById(id);
    // if (!user) throw CustomError.notFound(`User with id "${id}" not found`);

    // const existEmail = await UserModel.findOne({
    //   email: updateUserDto.email,
    // });
    // if (existEmail && user.email != updateUserDto.email)
    //   throw CustomError.badRequest("Email already exist");
    // try {
    //   const updateUSer = await UserModel.findByIdAndUpdate(id, updateUserDto, {
    //     new: true,
    //   });
    //   return updateUSer;
    // } catch (error) {
    //   throw CustomError.internalServer(`${error}`);
    // }
    return "Update Hospital";
  }

  public async deleteHospital() {
    // const deleteUser = await UserModel.findByIdAndDelete(id);
    // if (!deleteUser)
    //   throw CustomError.notFound(`User with id "${id}" not found`);
    // return deleteUser;
    return "Delete Hospital";
  }
}
