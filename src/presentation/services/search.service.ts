import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
// import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// import { EmailService } from "./email.service";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class SearchService {
  constructor() {}
  // constructor(private readonly emailService: EmailService) {}

  public async search(paginationDto: PaginationDto) {
    // const { page, limit } = paginationDto;

    // try {
    //   // const users = await UserModel.find({}, "name email role google");

    //   const [total, users] = await Promise.all([
    //     UserModel.countDocuments(),
    //     UserModel.find({}, "name email role google")
    //       .skip((page - 1) * limit)
    //       .limit(limit),
    //   ]);
    //   return {
    //     page,
    //     limit,
    //     total,
    //     next: `/api/users?page=${page + 1}&limit=${limit}`,
    //     prev:
    //       page - 1 > 0 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
    //     users,
    //   };
    // } catch (error) {
    //   throw CustomError.internalServer(`${error}`);
    // }
    return "Search!!";
  }
}
