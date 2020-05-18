import { ValidationError } from 'yup';

interface ValidateErros {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): ValidateErros {
  const validateError: ValidateErros = {};

  err.inner.forEach((error) => {
    validateError[error.path] = error.message;
  });

  return validateError;
}
