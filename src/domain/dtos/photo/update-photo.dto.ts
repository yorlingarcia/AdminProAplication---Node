import { UploadedFile } from "express-fileupload";

export class UpdatePhotoDto {
  private constructor(
    public id: string,
    public type: string,
    public readonly files: UploadedFile
  ) {}

  static update(object: { [key: string]: any }): [string?, UpdatePhotoDto?] {
    const { id, type, files } = object;

    if (!files) return ["Missing files", undefined];

    return [undefined, new UpdatePhotoDto(id, type, files)];
  }
}
