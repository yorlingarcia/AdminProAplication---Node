import { regularExps } from "../../../config";

export class CreateHospitalDto {
  private constructor(
    public readonly name: string,
    public readonly user: string // public readonly email: string,
  ) // public readonly password: string
  {}

  static create(object: { [key: string]: any }): [string?, CreateHospitalDto?] {
    const { name, user } = object;

    if (!name) return ["Missing name hospital", undefined];
    if (!user) return ["Missing user", undefined];
    // if (!email) return ["Missing email", undefined];
    // if (!regularExps.email.test(email))
    //   return ["Email is not valid", undefined];
    // if (!password) return ["Missing password", undefined];
    // if (password.length < 6) return ["Password too short"];

    return [undefined, new CreateHospitalDto(name, user)];
  }
}
