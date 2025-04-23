import HttpException from "./HttpException";

class ValidationException extends HttpException {
  public errors: any;

  constructor(status = 400, message = "Validation error", errors: any = null) {
    super(status, message);
    this.errors = errors;
  }
}

export default ValidationException;
