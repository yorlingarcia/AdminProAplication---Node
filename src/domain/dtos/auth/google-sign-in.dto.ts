export class GoogleSignInDto {
  private constructor(public readonly token: string) {}

  static create(object: { [key: string]: any }): [string?, GoogleSignInDto?] {
    const { token } = object;

    if (!token) return ["Missing token", undefined];

    return [undefined, new GoogleSignInDto(token)];
  }
}
