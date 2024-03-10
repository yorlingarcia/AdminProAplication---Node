import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password?: string,
    public readonly role?: "USER_ROLE" | "ADMIN_ROLE",
    public readonly img?: string,
    public readonly google?: boolean
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, role, img, google } = object;

    if (!_id && !id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(_id || id, name, email, password, role, img, google);
  }
}
