import {FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const firstName = control.get('firstNameControl');
  const lastName = control.get('lastNameControl');

  if (firstName.value && lastName.value) {
    if (firstName.value.toLowerCase() === lastName.value.toLowerCase()) {
      return { 'identityRevealed': true };
    }
  } else {
    return null;
  }
  // return firstName && lastName && firstName.value === lastName.value ? { 'identityRevealed': true } : null;
};
