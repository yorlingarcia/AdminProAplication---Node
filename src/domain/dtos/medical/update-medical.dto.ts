import mongoose from "mongoose";
import { UserEntity } from "../../entities/user.entity";

const ObjectId = mongoose.Types.ObjectId;
export class UpdateMedicalDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user: UserEntity,
    public readonly hospital: UserEntity
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateMedicalDto?] {
    const { id, name, user, hospital } = object;

    if (!name) return ["Missing name", undefined];
    if (!name) return ["Missing User", undefined];
    if (!hospital) return ["Missing Hospital Id", undefined];
    if (!ObjectId.isValid(id)) return [`Id "${id}" no valido`, undefined];
    if (!ObjectId.isValid(hospital))
      return [`Hospital "${hospital}" no valido`, undefined];

    return [undefined, new UpdateMedicalDto(id, name, user, hospital)];
  }
}
