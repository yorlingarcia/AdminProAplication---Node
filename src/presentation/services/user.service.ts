import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";

export class UserService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existEmail = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existEmail) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

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

  public async getUsers() {
    try {
      const users = await UserModel.find({}, "name email role google");
      return users;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateUser(updateUserDto: UpdateUserDto) {
    const id = updateUserDto.id;
    const user = await UserModel.findById(id);
    if (!user) throw CustomError.notFound(`User with id "${id}" not found`);

    const existEmail = await UserModel.findOne({
      email: updateUserDto.email,
    });
    if (existEmail && user.email != updateUserDto.email)
      throw CustomError.badRequest("Email already exist");
    try {
      const updateUSer = await UserModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      return updateUSer;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteUser(id: string) {
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser)
      throw CustomError.notFound(`User with id "${id}" not found`);
    return deleteUser;
  }
}
