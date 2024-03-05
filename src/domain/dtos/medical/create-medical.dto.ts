import { regularExps } from "../../../config";

export class CreateMedicalDto {
  private constructor(
    public readonly name: string,
    public readonly user: string,
    public readonly hospital: string // public readonly email: string, // public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateMedicalDto?] {
    const { name, user, hospital } = object;

    if (!name) return ["Missing name Medical", undefined];
    if (!user) return ["Missing user", undefined];
    if (!hospital) return ["Missing hospital", undefined];
    // if (!email) return ["Missing email", undefined];
    // if (!regularExps.email.test(email))
    //   return ["Email is not valid", undefined];
    // if (!password) return ["Missing password", undefined];
    // if (password.length < 6) return ["Password too short"];

    return [undefined, new CreateMedicalDto(name, user, hospital)];
  }
}
