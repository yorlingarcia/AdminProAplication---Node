import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class AuthService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({
      email: loginUserDto.email,
    });
    if (!existUser) throw CustomError.badRequest("Email not exist");

    const isMatch = bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );
    if (!isMatch) throw CustomError.badRequest("Password is not valid");

    try {
      const { password, ...userEntity } = UserEntity.fromObject(existUser);
      const token = await JwtAdapter.generateToken({
        id: userEntity.id,
        email: userEntity.email,
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
