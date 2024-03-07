import { JwtAdapter, bcryptAdapter } from "../../config";
import { MedicalModel } from "../../data";
import {
  CreateMedicalDto,
  CustomError,
  UpdateMedicalDto,
  UserEntity,
} from "../../domain";
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
      console.log(error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getMedicals() {
    try {
      const medical = await MedicalModel.find()
        .populate("user", "name img")
        .populate("hospital", "name img");
      return { medical };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateMedical(updateMedicalDto: UpdateMedicalDto) {
    const id = updateMedicalDto.id;
    const medical = await MedicalModel.findById(id);
    if (!medical)
      throw CustomError.notFound(`Medical with id "${id}" not found`);

    try {
      const cambioMedical = {
        name: updateMedicalDto.name,
        user: updateMedicalDto.user.id,
        hospital: updateMedicalDto.hospitalId,
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
