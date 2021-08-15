class CustomError extends Error {
  private _errorCode:number;
  constructor(message: string, errorCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this._errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get errorCode () {
    return this._errorCode;
  }
}

export default CustomError;