import CustomError from './CustomError';

const mockedOptions = {
  statusCode: 500,
  code: 1,
  data: { response: 'test' },
  type: 'CustomError',
};

describe('CustomError', () => {
  let testError: CustomError;
  beforeAll(() => {
    testError = new CustomError('Test Error', mockedOptions);
  });

  it('should have all the data', () => {
    expect(testError.statusCode).toEqual(mockedOptions.statusCode);
    expect(testError.code).toEqual(mockedOptions.code);
    expect(testError.data).toEqual(mockedOptions.data);
    expect(testError.type).toEqual(mockedOptions.type);
    expect(testError.function).toContain('CustomError.test.ts');
    expect(testError.message).toEqual('Test Error');
  });

  it('should generate a literal object with the error data', () => {
    const errorObject = testError.toObject();
    expect(errorObject).toMatchObject({
      type: mockedOptions.type,
      statusCode: mockedOptions.statusCode,
      code: mockedOptions.code,
      data: mockedOptions.data,
    });
    expect(errorObject.function).toContain('CustomError.test.ts');
  });
});
