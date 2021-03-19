'use strict';

export class Validator {
  static regExpName = /^[a-zA-Z_]{3,8}\d{0,2}$/;
  static regExpEmail = /^[\w]+@{1}[\w]+.{1}[\w]{2,}/;
  static regExpPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

  static #isValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
  }
  static #isInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
  }

  static validate(element, regExpType) {
    if (!element.value.match(regExpType) || element.value === '') {
      Validator.#isInvalid(element);
    } else {
      Validator.#isValid(element);
    }
  }

  static validatePasswordChange(passwords) {
    const toCompare = Object.values(passwords);
    if (toCompare[0] !== toCompare[1]) {
      throw new Error('New password and confirmation are different!');
    } else if (!toCompare[0].match(Validator.regExpPassword)) {
      throw new Error('New password is too weak!');
    }
  }
}
