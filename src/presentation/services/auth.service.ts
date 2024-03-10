import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  GoogleSignInDto,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { googleVerify } from "../helpers/google-verify";
import { getMenuFrontEnd } from "../helpers/menu-fronend";
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
        menu: getMenuFrontEnd(userEntity.role!),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async googleSignIn(googlesignInDto: GoogleSignInDto) {
    try {
      const { email, name, picture } = await googleVerify(
        googlesignInDto.token
      );

      const existUser = await UserModel.findOne({ email });
      let user;
      if (!existUser) {
        user = new UserModel({
          name,
          email,
          password: "@@@",
          img: picture,
          google: true,
        });
      } else {
        user = existUser;
        user.google = true;
      }

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);
      const token = await JwtAdapter.generateToken({
        id: userEntity.id,
        email: userEntity.email,
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user,
        token,
        menu: getMenuFrontEnd(userEntity.role!),
      };
    } catch (error) {
      console.log(error);
      throw CustomError.badRequest("El token proporciando no es correcto");
    }
  }

  public async renewToken(user: UserEntity) {
    const { password, ...userEntity } = UserEntity.fromObject(user);
    const token = await JwtAdapter.generateToken({
      id: userEntity.id,
      email: userEntity.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return { user, token, menu: getMenuFrontEnd(userEntity.role!) };
  }
}
9;
