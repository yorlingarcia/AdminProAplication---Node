import mongoose from "mongoose";
import { regularExps } from "../../../config";

const ObjectId = mongoose.Types.ObjectId;

export class UpdateUserDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { id, name, email, role } = object;

    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing email", undefined];
    if (!regularExps.email.test(email))
      return ["Email is not valid", undefined];
    if (!role) return ["Missing role", undefined];
    if (!ObjectId.isValid(id)) return [`Id "${id} no valido"`, undefined];

    return [undefined, new UpdateUserDto(id, name, email, role)];
  }
}
