import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";

export class AuthService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async loginUser(loginUserDto: LoginUserDto) {
    const existEmail = await UserModel.findOne({
      email: loginUserDto.email,
    });
    if (!existEmail) throw CustomError.badRequest("Email not exist");

    const isMathc = bcryptAdapter.compare(
      loginUserDto.password,
      existEmail.password
    );
    if (!isMathc) throw CustomError.badRequest("Password is not valid");

    try {
      const { password, ...userEntity } = UserEntity.fromObject(existEmail);
      // const token = await JwtAdapter.generateToken({
      //   id: userEntity.id,
      //   email: userEntity.email,
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
}
