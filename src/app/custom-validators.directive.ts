import {FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

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
};

export const birthdateEdgeValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  if (control.valid) {
    const birthdate: Date = new Date(control.value);
    const tenYearsAgo: Date = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

    return birthdate.getTime() > tenYearsAgo.getTime() ? {'birthdateEdge': true} : null;
  }
};
