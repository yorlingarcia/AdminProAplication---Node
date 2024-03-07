import { regularExps } from "../../../config";

export class UpdateHospitalDto {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdateHospitalDto?] {
    const { id, name } = object;

    if (!name) return ["Missing name", undefined];

    return [undefined, new UpdateHospitalDto(id, name)];
  }
}
