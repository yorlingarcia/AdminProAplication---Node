import mongoose from "mongoose";
import { UserEntity } from "../../entities/user.entity";

const ObjectId = mongoose.Types.ObjectId;

export class UpdateHospitalDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user: UserEntity
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateHospitalDto?] {
    const { id, name, user } = object;

    if (!name) return ["Missing name", undefined];
    if (!user) return ["Missing user", undefined];
    if (!ObjectId.isValid(id)) return [`Id "${id}" no valido`, undefined];

    return [undefined, new UpdateHospitalDto(id, name, user)];
  }
}
