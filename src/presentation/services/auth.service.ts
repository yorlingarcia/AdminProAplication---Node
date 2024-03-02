import { UserModel } from "../../data";
import { CustomError, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";

export class AuthService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar password
      // user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //Email de confirmacion
      // this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      // const token = await JwtAdapter.generateToken({
      //   id: user.id,
      // });
      // if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: userEntity,
        // token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getUsers() {
    try {
      const users = await UserModel.find({}, "name email role google");
      return users;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
