import { JwtAdapter, bcryptAdapter } from "../../config";
import { MedicalModel } from "../../data";
import { CreateMedicalDto, CustomError, UserEntity } from "../../domain";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";

export class MedicalService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async createMedical(createMedicalDto: CreateMedicalDto) {
    // const existEmail = await UserModel.findOne({
    //   email: registerUserDto.email,
    // });
    // if (existEmail) throw CustomError.badRequest("Email already exist");

    try {
      const medical = new MedicalModel(createMedicalDto);

      // Encriptar password
      // user.password = bcryptAdapter.hash(registerUserDto.password);

      await medical.save();

      // const { password, ...userEntity } = UserEntity.fromObject(user);

      // const token = await JwtAdapter.generateToken({
      //   id: userEntity.id,
      //   email: userEntity.email,
      // });
      // if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        medical: medical,
        // token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getMedicals() {
    // try {
    //   const users = await UserModel.find({}, "name email role google");
    //   return users;
    // } catch (error) {
    //   throw CustomError.internalServer(`${error}`);
    // }
    return "Get Medicals";
  }

  public async updateMedical() {
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
    return "Update Medical";
  }

  public async deleteMedical() {
    // const deleteUser = await UserModel.findByIdAndDelete(id);
    // if (!deleteUser)
    //   throw CustomError.notFound(`User with id "${id}" not found`);
    // return deleteUser;
    return "Delete Medical";
  }
}
