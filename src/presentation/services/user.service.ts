import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class UserService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: CreateUserDto) {
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

  public async getUsers(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // const users = await UserModel.find({}, "name email role google");

      const [total, users] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.find({}, "name email role google img")
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page,
        limit,
        total,
        next:
          page * limit < total
            ? `/api/users?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
        users,
      };
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
      let actualizarCampos;
      if (user.google) {
        actualizarCampos = {
          ...updateUserDto,
          email: user.email,
        };
        if (user.email !== updateUserDto.email)
          throw CustomError.badRequest(
            `Usuarios de google no pueden actualizar su correo`
          );
      } else {
        actualizarCampos = {
          ...updateUserDto,
        };
      }

      const updateUSer = await UserModel.findByIdAndUpdate(
        id,
        actualizarCampos,
        {
          new: true,
        }
      );
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
