import { JwtAdapter, bcryptAdapter } from "../../config";
import { HospitalModel, MedicalModel, UserModel } from "../../data";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class SearchService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async search(search: string) {
    const regularExp = RegExp(search, "i");
    const [users, hospitals, medicals] = await Promise.all([
      UserModel.find({ name: regularExp }),
      HospitalModel.find({ name: regularExp }),
      MedicalModel.find({ name: regularExp }),
    ]);
    return {
      users,
      hospitals,
      medicals,
    };
  }

  public async searchCollection([table, search]: string[]) {
    const regularExp = RegExp(search, "i");
    let data;
    switch (table) {
      case "users":
        data = await UserModel.find({ name: regularExp });
        break;
      case "hospitals":
        data = await HospitalModel.find({ name: regularExp }).populate(
          "user",
          "name img"
        );
        break;
      case "medicals":
        data = await MedicalModel.find({ name: regularExp })
          .populate("user", "name img")
          .populate("hospital", "name img");
        break;
      default:
        throw CustomError.badRequest(
          'La tabla tiene que ser "users", "hospitals", "medicals"'
        );
    }
    return {
      data,
    };
  }
}
