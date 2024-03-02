export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const PASSWORD_HASH_ROUNDS = 10;

export const VERIFICATION_CODE_LENGTH = 128;

export const AUTH_VALIDATION_ERRORS = {
  NICKNAME_EMPTY: 'auth.nickname_empty',
  NICKNAME_INVALID: 'auth.nickname_invalid',

  EMAIL_EMPTY: 'auth.email_empty',
  EMAIL_INVALID: 'auth.email_invalid',

  PASSWORD_EMPTY: 'auth.password_empty',
  PASSWORD_INVALID: 'auth.password_invalid',
  PASSWORD_MIN_LENGTH_INVALID: 'auth.password_min_length_invalid',
  PASSWORD_MAX_LENGTH_INVALID: 'auth.password_max_length_invalid',
};

export const AUTH_ERRORS = {
  EMAIL_ALREADY_TAKEN: 'auth.email_already_taken',
  NICKNAME_ALREADY_TAKEN: 'auth.nickname_already_taken',
  VERIFICATION_CODE_NOT_FOUND: 'auth.verification_code_not_found',
  INVALID_EMAIL_OR_PASSWORD: 'auth.invalid_email_or_password',
};

export const AUTH_SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'auth.account_created',
};
