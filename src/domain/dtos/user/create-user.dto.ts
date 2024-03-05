import { regularExps } from "../../../config";

export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name user", undefined];
    if (!email) return ["Missing email", undefined];
    if (!regularExps.email.test(email))
      return ["Email is not valid", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new CreateUserDto(name, email, password)];
  }
}
