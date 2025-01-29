export class CustomError extends Error {
  statusCode: number;
  code: string | undefined;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
