// eslint-disable-next-line no-shadow
enum errorCodes {
  UNKNOWN_ERROR = 0,
}

type errorOptions = {
  statusCode?: number;
  code?: errorCodes;
  data?: Record<string, unknown>;
  type?: string;
};

/**
 * A way to provide more detailed error in logs
 */
class CustomError extends Error {
  /** HTTP status code */
  statusCode: number;
  /** General error code */
  code: number;
  type: string;

  readonly isCustomError = true;
  /** Line where error was triggered */
  readonly function: string;
  /** Additional data */
  data: Record<string, unknown> | undefined | string;

  constructor(message: string, opts?: errorOptions) {
    super(message);
    this.statusCode = opts?.statusCode || 500;
    this.code = opts?.code || 0;
    this.function = CustomError.getLine(this.stack || '');
    this.type = opts?.type || this.name;
    this.data = opts?.data;
  }

  private static getLine(stack: string): string {
    return stack.split('\n')[1].trim();
  }

  toObject(): Record<string, unknown> {
    const { type, statusCode, code, data } = this;

    return {
      function: this.function,
      type,
      statusCode,
      code,
      data,
    };
  }
}

export default CustomError;
