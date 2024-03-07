import { regularExps } from "../../../config";
import { UserEntity } from "../../entities/user.entity";

export class UpdateMedicalDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user: UserEntity,
    public readonly hospitalId: UserEntity
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateMedicalDto?] {
    const { id, name, user, hospitalId } = object;

    if (!name) return ["Missing name", undefined];
    if (!name) return ["Missing User", undefined];
    if (!hospitalId) return ["Missing Hospital Id", undefined];

    return [undefined, new UpdateMedicalDto(id, name, user, hospitalId)];
  }
}
