import validator from 'validator';

export const emailValidationCheck = (email: string ) => {
    if (validator.isEmail(email)) {
      return true;
    }
    else return false;
  }

  export const passwordValidationCheck = (password: string) => {
    if(validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
      return true;
      }
    else return false;
  }